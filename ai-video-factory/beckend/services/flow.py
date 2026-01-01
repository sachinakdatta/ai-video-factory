import uuid
import os

BASE_PATH = "backend/storage/projects"

def generate_visual(data):
    project = data.get("project", "demo")
    scene = data.get("scene", 1)

    project_path = f"{BASE_PATH}/{project}/scenes"
    os.makedirs(project_path, exist_ok=True)

    fake_video = f"{project_path}/scene_{scene}.mp4"
    with open(fake_video, "w") as f:
        f.write("FAKE VIDEO FILE")

    return {
        "scene": scene,
        "video_path": fake_video,
        "status": "ready",
        "credits_used": 2.5
    }
