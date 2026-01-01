import streamlit as st
import requests

API = "http://localhost:8000"

st.set_page_config(page_title="AI Video Factory", layout="wide")
st.title("🎬 AI Video Factory")

# ---- PROJECT ----
st.sidebar.header("New Project")
project = st.sidebar.text_input("Project Name", "colors_train")
topic = st.sidebar.text_input("Idea / Keyword", "colors rhyme for kids")

if st.sidebar.button("Generate Script"):
    res = requests.post(f"{API}/project/generate-script", json={"topic": topic})
    st.session_state.script = res.json()["script"]

# ---- SCRIPT ----
if "script" in st.session_state:
    st.subheader("✍ Script Review")
    script = st.text_area("Script", st.session_state.script, height=200)

    if st.button("Approve Script"):
        res = requests.post(f"{API}/project/generate-scenes", json={"script": script})
        st.session_state.scenes = res.json()["scenes"]

# ---- SCENES ----
if "scenes" in st.session_state:
    st.subheader("🎬 Scenes")
    for scene in st.session_state.scenes:
        col1, col2 = st.columns([3,1])
        col1.write(f"**Scene {scene['scene']}**: {scene['text']}")

        if col2.button(f"Generate Scene {scene['scene']}"):
            res = requests.post(
                f"{API}/scene/generate-visual",
                json={"project": project, "scene": scene["scene"]}
            )
            st.success(f"Scene {scene['scene']} ready")

# ---- MUSIC ----
if st.button("Generate Music"):
    res = requests.post(f"{API}/project/generate-music", json={"project": project})
    st.success("Music generated")

# ---- EXPORT ----
if st.button("Export Project"):
    res = requests.post(f"{API}/project/export", json={"project": project})
    st.success(res.json()["message"])
