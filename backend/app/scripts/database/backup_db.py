from typing import Optional

import typer
from botocore.exceptions import ClientError
import boto3
from mypy_boto3_s3 import S3Client
from datetime import datetime, UTC
import os
import subprocess  # nosec
import tempfile

from app.core.config.config import settings
from app.core.config.settings import Settings
import structlog
from structlog.contextvars import clear_contextvars, bind_contextvars


class BackupDB:
    NO_DUMP_CREATED_ERROR: str = "Failed to generate DB dump"
    FAILED_TO_RETRIEVE_ERROR: str = "Failed to retrieve old backups"
    FAILED_TO_DELETE_ERROR: str = "Failed to delete old backup"
    BACKUPS_DISABLED_ERROR: str = "Backups are disabled in development mode"
    FAILED_TO_UPLOAD_ERROR: str = "Failed to upload DB dump to S3"

    def __init__(
        self,
        backup_settings: Optional[Settings] = None,
        logger: Optional[structlog.BoundLogger] = None,
    ):
        self.settings: Settings = backup_settings or settings
        self.logger: structlog.BoundLogger = logger or structlog.get_logger()

        if self.settings.DEVELOPMENT:
            raise RuntimeError(self.BACKUPS_DISABLED_ERROR)

        self.s3_client: S3Client = self._initialize_s3_client()

    def backup(self) -> None:
        """backup database to file and upload to S3"""
        try:
            with tempfile.TemporaryDirectory() as tmp_dir:
                file_name: str = (
                    f"db_backup_{datetime.now(UTC).strftime('%Y-%m-%d')}.sql"
                )
                full_backup_path: str = os.path.join(tmp_dir, file_name)

                bind_contextvars(
                    script=__name__,
                    file_name=file_name,
                    full_backup_path=full_backup_path,
                )

                self.logger.info("Starting database backup")

                self._backup_database(full_backup_path)
                self.s3_client.upload_file(
                    full_backup_path,
                    self.settings.AWS_S3_BUCKET_NAME,
                    f"{self.settings.AWS_S3_BACKUP_PATH}{file_name}",
                )
                self.logger.info("Backup uploaded to S3")
                self._delete_old_backups()

                self.logger.info("Completed database backup")
        except (RuntimeError, OSError) as e:
            self.logger.error(
                f"Failed database backup: {str(e)}", exc_info=True
            )
            raise
        finally:
            clear_contextvars()

    def _backup_database(self, full_backup_path: str) -> None:
        """dump database to file"""
        with open(full_backup_path, "w", encoding="utf-8") as backup_file:
            env = os.environ.copy()
            env["PGPASSWORD"] = self.settings.POSTGRES_PASSWORD

            try:
                subprocess.run(  # nosec
                    self._db_backup_command(),
                    env=env,
                    stdout=backup_file,
                    check=True,
                    timeout=300,
                )
            except subprocess.CalledProcessError as e:
                raise RuntimeError(self.NO_DUMP_CREATED_ERROR) from e

            file_size = os.stat(full_backup_path).st_size

            if file_size == 0:
                raise RuntimeError(self.NO_DUMP_CREATED_ERROR)

            bind_contextvars(file_size=file_size)
            self.logger.info("Database backup created")

    def _db_backup_command(self) -> list[str]:
        return [
            "pg_dump",
            "--clean",
            "--inserts",
            "-U",
            self.settings.POSTGRES_USER,
            "-h",
            self.settings.POSTGRES_SERVER,
            self.settings.POSTGRES_DB,
        ]

    def _delete_old_backups(self) -> None:
        """delete old backups from S3"""
        try:
            all_files = self.s3_client.list_objects_v2(
                Bucket=self.settings.AWS_S3_BUCKET_NAME,
                Prefix=self.settings.AWS_S3_BACKUP_PATH,
            ).get("Contents", [])
        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_RETRIEVE_ERROR) from e

        try:
            valid_files = sorted(
                (file for file in all_files if file["Key"].endswith(".sql")),
                key=lambda x: x["LastModified"],
                reverse=True,
            )

            files_to_delete = valid_files[self.settings.DAYS_BACKUPS_TO_KEEP :]

            for file in files_to_delete:
                self.s3_client.delete_object(
                    Bucket=self.settings.AWS_S3_BUCKET_NAME,
                    Key=file["Key"],
                )

            bind_contextvars(deleted_files=len(files_to_delete))
            self.logger.info("Old backups deleted")
        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_DELETE_ERROR) from e

    def _initialize_s3_client(self) -> S3Client:
        """initialize boto S3 client"""
        return boto3.client("s3")


app = typer.Typer()


@app.command()
def backup_db():
    BackupDB().backup()
