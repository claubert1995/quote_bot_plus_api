from fastapi import APIRouter,Request
from services.service import quote_generator
from models.model import QuotePrompt
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

router = APIRouter()

#Template for using HTML on FASTAPI
template = Jinja2Templates(
    directory="templates"
)

#Route for prompt via API
@router.post("/API/prompt")
async def prompt(prompt: QuotePrompt):

    result = quote_generator(prompt.theme)
    return {"Citation": result}

#Route for HTML page
@router.get("/",response_class=HTMLResponse)
async def home(request: Request):
    return  template.TemplateResponse("index.html",{"request":request})