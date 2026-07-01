import typer
from botocore.exceptions import ClientError
from app.core.config.config import settings
import boto3
from mypy_boto3_s3 import S3Client
from datetime import datetime
import os
import subprocess  # nosec
import tempfile


class BackupDB:
    NO_DUMP_CREATED_ERROR: str = "Failed to generate DB dump"
    FAILED_TO_RETRIEVE_ERROR: str = "Failed to retrieve old backups"
    FAILED_TO_DELETE_ERROR: str = "Failed to delete old backup"
    FAILED_TO_CONNECT_ERROR: str = "Failed to connect to S3"

    BACKUP_COMMAND: list[str] = [
        "pg_dump",
        "--clean",
        "--inserts",
        "-U",
        settings.POSTGRES_USER,
        "-h",
        settings.POSTGRES_SERVER,
        settings.POSTGRES_DB,
    ]

    def __init__(self):
        if settings.DEVELOPMENT:
            raise RuntimeError("Backups are disabled in development mode")

        self.s3_client: S3Client = self._initialize_s3_client()

    def backup(self) -> None:
        """backup database to file and upload to S3"""
        try:
            with tempfile.TemporaryDirectory() as tmp_dir:
                file_name: str = (
                    f"db_backup_{datetime.now().strftime('%Y-%m-%d')}.sql"
                )
                full_backup_path: str = os.path.join(tmp_dir, file_name)

                self._backup_database(full_backup_path)
                self.s3_client.upload_file(
                    full_backup_path,
                    settings.AWS_S3_BUCKET_NAME,
                    f"{settings.AWS_S3_BACKUP_PATH}{file_name}",
                )
                self._clean_old_backups()
        except ClientError as e:
            raise RuntimeError("Failed to upload DB dump to S3") from e

    def _backup_database(self, full_backup_path: str) -> None:
        """dump database to file"""
        with open(full_backup_path, "w", encoding="utf-8") as backup_file:
            env = os.environ.copy()
            env["PGPASSWORD"] = settings.POSTGRES_PASSWORD

            try:
                subprocess.run(  # nosec
                    self.BACKUP_COMMAND,
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

    def _clean_old_backups(self) -> None:
        """clean old backups from S3"""
        try:
            all_files = self.s3_client.list_objects_v2(
                Bucket=settings.AWS_S3_BUCKET_NAME,
                Prefix=settings.AWS_S3_BACKUP_PATH,
            ).get("Contents", [])

            valid_files = sorted(
                (
                    file
                    for file in all_files if file["Key"].endswith(".sql")
                ),
                key=lambda x: x["LastModified"],
                reverse=True,
            )

            for file in valid_files[settings.DAYS_BACKUPS_TO_KEEP:]:
                self.s3_client.delete_object(
                    Bucket=settings.AWS_S3_BUCKET_NAME,
                    Key=file["Key"],
                )
        except KeyError:
            raise RuntimeError(self.FAILED_TO_RETRIEVE_ERROR)
        except (TypeError, ClientError):
            raise RuntimeError(self.FAILED_TO_DELETE_ERROR)

    def _initialize_s3_client(self) -> S3Client:
        """initialize boto S3 client"""
        try:
            return boto3.client("s3")
        except ClientError:
            raise RuntimeError(self.FAILED_TO_CONNECT_ERROR)


app = typer.Typer()

@app.command()
def backup_db():
    BackupDB().backup()