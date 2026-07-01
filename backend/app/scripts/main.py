import typer
from app.scripts.database import app as database_app

app = typer.Typer()
app.add_typer(database_app, name="database")

if __name__ == "__main__":
    app()