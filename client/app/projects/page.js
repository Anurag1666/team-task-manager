"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = () => {
    API.get("/projects").then((res) => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Projects 📁</h1>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>Create Project</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}