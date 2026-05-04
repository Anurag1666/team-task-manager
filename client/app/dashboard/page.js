"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = () => {
    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async () => {
    if (!title) return alert("Enter task title");

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}/status`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 📊 STATS CALCULATION
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const todo = tasks.filter((t) => t.status === "TODO").length;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard 📊</h1>

      {/* ➕ Add Task */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />

      <button onClick={createTask}>Add Task</button>

      {/* 📊 Stats */}
      <div style={{ marginTop: 20 }}>
        <h2>Total Tasks: {total}</h2>
        <h3>Completed: {completed}</h3>
        <h3>In Progress: {inProgress}</h3>
        <h3>Todo: {todo}</h3>
      </div>

      {/* 📋 Task List */}
      <ul style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 15 }}>
            <strong>{task.title}</strong> — {task.status}

            <br />

            <button onClick={() => updateStatus(task.id, "TODO")}>
              TODO
            </button>

            <button onClick={() => updateStatus(task.id, "IN_PROGRESS")}>
              IN PROGRESS
            </button>

            <button onClick={() => updateStatus(task.id, "COMPLETED")}>
              COMPLETED
            </button>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}