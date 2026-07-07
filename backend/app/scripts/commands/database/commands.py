import typer

from anydi import Provide
from app.scripts.commands.database.backport_db import BackportDB
from app.scripts.commands.database.backup_db import BackupDB

app = typer.Typer()


@app.command(
    name="backport-db", help="Backports the database to the latest version."
)
def backport(backport_db: Provide[BackportDB]) -> None:
    backport_db.backport()


@app.command(name="backup-db", help="Backs up the database to S3.")
def backup(backup_db: Provide[BackupDB]) -> None:
    backup_db.backup()
