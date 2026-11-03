from flask import Flask, jsonify, request

app = Flask(__name__)

# A very small "database": a list that lives in memory.
# (It resets when the app restarts. A real database comes later.)
tasks = [{"id": 1, "title": "Learn GitHub Actions", "done": False}]


@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.get("/api/tasks")
def list_tasks():
    return jsonify(tasks)


@app.post("/api/tasks")
def add_task():
    data = request.get_json(silent=True) or {}
    title = str(data.get("title", "")).strip()
    if not title:
        return jsonify(error="title is required"), 400
    task = {"id": len(tasks) + 1, "title": title, "done": False}
    tasks.append(task)
    return jsonify(task), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)