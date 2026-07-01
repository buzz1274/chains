from typing import Optional

import typer
from botocore.exceptions import ClientError
from app.core.config.config import settings
import boto3
from mypy_boto3_s3 import S3Client
from datetime import datetime, UTC
import os
import subprocess  # nosec
import tempfile
from app.core.config.settings import Settings
import structlog


class BackupDB:
    NO_DUMP_CREATED_ERROR: str = "Failed to generate DB dump"
    FAILED_TO_RETRIEVE_ERROR: str = "Failed to retrieve old backups"
    FAILED_TO_DELETE_ERROR: str = "Failed to delete old backup"
    FAILED_TO_CONNECT_ERROR: str = "Failed to connect to S3"
    BACKUPS_DISABLED_ERROR: str = "Backups are disabled in development mode"
    FAILED_TO_UPLOAD_ERROR: str = "Failed to upload DB dump to S3"

    def __init__(
        self,
        backup_settings: Optional[Settings] = None,
        logger: Optional[structlog.BoundLogger] = None
    ):
        self.settings: Settings = backup_settings or settings
        self.logger: structlog.BoundLogger = logger or structlog.get_logger()

        if self.settings.DEVELOPMENT:
            raise RuntimeError(self.BACKUPS_DISABLED_ERROR)

        self.s3_client: S3Client = self._initialize_s3_client()

    def backup(self) -> None:
        """backup database to file and upload to S3"""
        log: structlog.BoundLogger = self.logger

        try:
            with tempfile.TemporaryDirectory() as tmp_dir:
                file_name: str = (
                    f"db_backup_{datetime.now(UTC).strftime('%Y-%m-%d')}.sql"
                )
                full_backup_path: str = os.path.join(tmp_dir, file_name)

                log = log.bind(
                    file_name=file_name,
                    full_backup_path=full_backup_path
                )

                log.info("Starting database backup")

                self._backup_database(full_backup_path)
                self.s3_client.upload_file(
                    full_backup_path,
                    self.settings.AWS_S3_BUCKET_NAME,
                    f"{self.settings.AWS_S3_BACKUP_PATH}{file_name}",
                )
                self._clean_old_backups()

                log.info("Completed database backup")
        except RuntimeError as e:
            log.error(f"Failed database backup: {str(e)}", exc_info=True)
            raise

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

            if (not os.path.isfile(full_backup_path) or
                os.stat(full_backup_path).st_size == 0):
                raise RuntimeError(self.NO_DUMP_CREATED_ERROR)

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

    def _clean_old_backups(self) -> None:
        """clean old backups from S3"""
        try:
            all_files = self.s3_client.list_objects_v2(
                Bucket=self.settings.AWS_S3_BUCKET_NAME,
                Prefix=self.settings.AWS_S3_BACKUP_PATH,
            ).get("Contents", [])
        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_RETRIEVE_ERROR) from e

        try:
            valid_files = sorted(
                (
                    file
                    for file in all_files if file["Key"].endswith(".sql")
                ),
                key=lambda x: x["LastModified"],
                reverse=True,
            )

            for file in valid_files[self.settings.DAYS_BACKUPS_TO_KEEP:]:
                self.s3_client.delete_object(
                    Bucket=self.settings.AWS_S3_BUCKET_NAME,
                    Key=file["Key"],
                )
        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_DELETE_ERROR) from e

    def _initialize_s3_client(self) -> S3Client:
        """initialize boto S3 client"""
        return boto3.client("s3")

app = typer.Typer()

@app.command()
def backup_db():
    BackupDB(settings, structlog.get_logger()).backup()