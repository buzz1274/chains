from fastapi import FastAPI


app = FastAPI()

@app.get('/api/')
async def read_results():
    return 'Hello World'