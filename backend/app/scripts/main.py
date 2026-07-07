import typer
import anydi.ext.typer
from app.scripts.commands.database.commands import app as database_commands
from app.scripts.container import container

app = typer.Typer()
app.add_typer(database_commands, name="database")

anydi.ext.typer.install(app, container)

if __name__ == "__main__":
    app()
