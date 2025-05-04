"""
AKA Discharge. Provides an authenticated static file mount to be used for Railgun.
Mostly provided by:
https://github.com/fastapi/fastapi/issues/858
"""
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import os

abspathlocal = Path(os.path.dirname(os.path.abspath(__file__)))
dumppath = "dump"


print(abspathlocal)
print((abspathlocal/dumppath).glob("*").__next__())

bootleg_app = FastAPI()

bootleg_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@bootleg_app.get("/filepath")
async def get_image_name():
    return (abspathlocal/dumppath).glob("*").__next__().name


@bootleg_app.post("/judge")
async def move_pic(request: Request):
    req = await request.json()
    if req["judgement"]=="yeet":
        (abspathlocal / dumppath / req["path"]).rename(abspathlocal / "yeet" / req["path"])
    elif req["judgement"]=="yikes":
        (abspathlocal / dumppath/ req["path"]).rename(abspathlocal / "yikes" / req["path"])
    elif req["judgement"]=="mid":
        (abspathlocal / dumppath/ req["path"]).rename(abspathlocal / "mid" / req["path"])
    elif req["judgement"]=="icanfixher":
        (abspathlocal / dumppath/ req["path"]).rename(abspathlocal / "icanfixher" / req["path"])
    elif req["judgement"]=="noice":
        (abspathlocal / dumppath/ req["path"]).rename(abspathlocal / "noice" / req["path"])
    elif req["judgement"]=="poggers":
        (abspathlocal / dumppath/ req["path"]).rename(abspathlocal / "poggers" / req["path"])


bootleg_app.mount(
    "/discharge",
    StaticFiles(directory="dump/"),
    name="discharge",
)


if __name__ == "__main__":
    uvicorn.run(
        "app:bootleg_app",
        port=5555,
        host='0.0.0.0',  # DevEnv
        log_level="debug"
    )
