import tempfile
import subprocess  # nosec
import os
from structlog import BoundLogger
from structlog.contextvars import clear_contextvars, bind_contextvars

from app.core.config.settings import Settings
from app.scripts.utilities.file_storage import FileStorage
from anydi import transient


@transient()
class BackportDB:
    BACKPORTS_DISABLED_ERROR: str = "Backports are disabled in production mode"

    def __init__(
        self,
        settings: Settings,
        file_storage: FileStorage,
        logger: BoundLogger,
    ):
        self.settings: Settings = settings
        self.logger: BoundLogger = logger
        self.file_storage: FileStorage = file_storage

        if not self.settings.DEVELOPMENT:
            raise RuntimeError(self.BACKPORTS_DISABLED_ERROR)

    def backport(self):
        try:
            bind_contextvars(
                script=__name__,
            )

            self.logger.info("Starting database backport")
            self.logger.info(
                f"Downloading latest backup"
                f"from {self.file_storage.__class__.__name__}"
            )

            with (
                tempfile.TemporaryDirectory() as tmp_dir,
                open(
                    self.file_storage.get_latest_backup_file(tmp_dir),
                    "r",
                ) as backport_file,
            ):
                bind_contextvars(
                    backport_file=backport_file.name,
                )

                env = {
                    **os.environ,
                    "PGPASSWORD": self.settings.POSTGRES_PASSWORD,
                }

                self.logger.info("Importing data")

                process = subprocess.Popen(  # nosec
                    self._import_command(),
                    env=env,
                    stdin=backport_file,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    bufsize=1,
                )

                if process.stdout is None:
                    raise RuntimeError("subprocess stdout not available")

                for line in process.stdout:
                    line = line.rstrip()

                    if line:
                        level = "error" if "ERROR" in line else "info"
                        getattr(self.logger, level)("psql", message=line)

                return_code: int = process.wait()

                if return_code != 0:
                    raise RuntimeError(f"psql exited with code {return_code}")

            self.logger.info("Completed database backport")

        except RuntimeError as e:
            self.logger.error(
                f"Failed database backport: {str(e)}", exc_info=True
            )
            raise
        finally:
            clear_contextvars()

    def _import_command(self) -> list[str]:
        return [
            "psql",
            "-U",
            self.settings.POSTGRES_USER,
            "-h",
            self.settings.POSTGRES_SERVER,
            self.settings.POSTGRES_DB,
        ]
