from fastapi import FastAPI
from routes.route import router
from fastapi.staticfiles import StaticFiles



app = FastAPI(
	title="QUOTEAI+",
	debug=True,
	version="1.0.0",
	summary="Web api for model citation quote french"
)

@app.get("/running")
async def home():
	return {"Message": "First running App"}

app.include_router(router)
app.mount("/static", StaticFiles(directory="static"), name="static")
