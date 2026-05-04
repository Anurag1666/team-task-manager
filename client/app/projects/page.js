"use client";

import { useState, useEffect } from "react";
import API from "../../services/api";

export default function Projects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const createProject = async () => {
    if (!name) return alert("Enter project name");

    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📁 Projects</h1>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />

      <button onClick={createProject}>Create Project</button>

      <ul style={{ marginTop: 20 }}>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}