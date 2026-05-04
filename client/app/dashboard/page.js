"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    API.get("/tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await API.post("/tasks", {
      title,
      dueDate: new Date().toISOString(), // temp due date
    });
    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}/status`, { status });
    fetchTasks();
  };

  // 🔥 STATS LOGIC
  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;

  const overdue = tasks.filter((t) => {
    return (
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED"
    );
  }).length;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard 📊</h1>

      {/* CREATE TASK */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Add Task</button>

      {/* 🔥 STATS UI */}
      <h2>Stats</h2>
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>In Progress: {inProgress}</p>
      <p>Overdue: {overdue}</p>

      <hr />

      {/* TASK LIST */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.status}

            <br />

            <button onClick={() => updateStatus(task.id, "TODO")}>
              TODO
            </button>

            <button
              onClick={() => updateStatus(task.id, "IN_PROGRESS")}
            >
              IN PROGRESS
            </button>

            <button
              onClick={() => updateStatus(task.id, "COMPLETED")}
            >
              COMPLETED
            </button>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}