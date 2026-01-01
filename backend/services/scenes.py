def generate_scenes(data):
    script = data.get("script", "")
    lines = [l for l in script.split("\n") if l.strip()]
    scenes = []

    for i, line in enumerate(lines):
        scenes.append({
            "scene": i + 1,
            "text": line,
            "duration": 4,
            "status": "pending"
        })

    return {"scenes": scenes}
