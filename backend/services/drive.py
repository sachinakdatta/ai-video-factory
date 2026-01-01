def export_project(data):
    project = data.get("project")
    return {
        "message": f"Project {project} exported to Google Drive (mock)",
        "status": "success"
    }
