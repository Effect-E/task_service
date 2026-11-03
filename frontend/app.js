// The page talks to the backend through the same address, under /api.
async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  const list = document.getElementById("tasks");
  list.innerHTML = "";
  for (const t of tasks) {
    const li = document.createElement("li");
    li.textContent = t.title;
    list.appendChild(li);
  }
}

async function checkBackend() {
  const status = document.getElementById("status");
  try {
    const res = await fetch("/api/health");
    status.textContent = res.ok ? "Backend is running" : "Backend problem";
  } catch (e) {
    status.textContent = "Cannot reach the backend";
  }
}

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("title");
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  loadTasks();
});

checkBackend();
loadTasks();