import typer

from app.scripts.database.backup_db import app as backup_db_app
#from .backup_db import app as backup_db_app

app = typer.Typer()

#app.add_typer(backport_db_app)
app.add_typer(backup_db_app)