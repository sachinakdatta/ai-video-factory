def generate_script(data):
    topic = data.get("topic", "")
    script = f"""
🎵 Welcome kids!
Today we learn COLORS!

Red train goes choo choo 🚂
Blue sky says hello 💙
Yellow sun shines bright ☀️

Sing with me, sing with me!
Colors are fun to see!
"""
    return {"script": script.strip()}
