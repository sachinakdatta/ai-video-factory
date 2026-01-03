from fastapi import FastAPI
from services.script import generate_script
from services.scenes import generate_scenes
from services.flow import generate_visual
from services.suno import generate_music
from services.drive import export_project

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/project/generate-script")
def script_endpoint(data: dict):
    return generate_script(data)

@app.post("/project/generate-scenes")
def scenes_endpoint(data: dict):
    return generate_scenes(data)

@app.post("/scene/generate-visual")
def visual_endpoint(data: dict):
    return generate_visual(data)

@app.post("/project/generate-music")
def music_endpoint(data: dict):
    return generate_music(data)

@app.post("/project/export")
def export_endpoint(data: dict):
    return export_project(data)
