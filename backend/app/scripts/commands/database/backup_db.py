from datetime import datetime, UTC
import os
import subprocess  # nosec
import tempfile
from anydi import transient

from app.core.config.settings import Settings
from structlog import BoundLogger
from structlog.contextvars import clear_contextvars, bind_contextvars

from app.scripts.utilities.file_storage import FileStorage


@transient()
class BackupDB:
    NO_DUMP_CREATED_ERROR: str = "Failed to generate DB dump"
    FAILED_TO_RETRIEVE_ERROR: str = "Failed to retrieve old backups"
    FAILED_TO_DELETE_ERROR: str = "Failed to delete old backup"
    BACKUPS_DISABLED_ERROR: str = "Backups are disabled in development mode"
    FAILED_TO_UPLOAD_ERROR: str = "Failed to upload DB dump to S3"

    def __init__(
        self,
        backup_settings: Settings,
        file_storage: FileStorage,
        logger: BoundLogger,
    ):
        self.settings: Settings = backup_settings
        self.file_storage: FileStorage = file_storage
        self.logger: BoundLogger = logger

        if self.settings.DEVELOPMENT:
            raise RuntimeError(self.BACKUPS_DISABLED_ERROR)

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
                self.file_storage.delete_old_backups(
                    self.settings.DAYS_BACKUPS_TO_KEEP
                )
                self.logger.info("Old backups deleted")

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
            env = {
                **os.environ,
                "PGPASSWORD": self.settings.POSTGRES_PASSWORD,
            }

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

            if not self.file_storage.is_valid_file(full_backup_path):
                raise RuntimeError(self.NO_DUMP_CREATED_ERROR)

            bind_contextvars(file_size=os.stat(full_backup_path).st_size)
            self.logger.info("Database backup created")

            self.file_storage.save_file(full_backup_path)
            self.logger.info(
                f"Backup uploaded to {self.file_storage.__class__.__name__}"
            )

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
