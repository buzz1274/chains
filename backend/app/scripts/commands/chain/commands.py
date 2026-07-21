import typer

from anydi import Provide

from app.scripts.commands.chain.update_chain_history import UpdateChainHistory

app = typer.Typer()


@app.command(name="update-chain-history", help="Inserts .")
async def update(update_chain_history: Provide[UpdateChainHistory]) -> None:
    await update_chain_history.update_chain_history()
