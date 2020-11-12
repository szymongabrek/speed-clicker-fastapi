from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


class HighScore(BaseModel):
    nickname: str
    time: int

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


highscores = [{"nickname": "Szymon", "time": 123}]


@app.get("/", response_class=HTMLResponse)
async def read_homepage(request: Request):
    return templates.TemplateResponse("index.html",{"request": request})

@app.get("/highscore")
def read_highscores():
    return highscores

@app.post("/highscore")
def add_highscore(highScore: HighScore):
    highscores.append(highScore)
    return highScore