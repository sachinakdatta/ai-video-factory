def generate_music(data):
    project = data.get("project", "demo")
    music_path = f"backend/storage/projects/{project}/music.mp3"

    with open(music_path, "w") as f:
        f.write("FAKE MUSIC FILE")

    return {
        "music_path": music_path,
        "credits_used": 1.2
    }
