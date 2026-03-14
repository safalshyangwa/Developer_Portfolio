"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projectAPI } from "@/services/project.service";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    async function fetchProjects() {
      const data = await projectAPI.getProjects();
      setProjects(data.data);
    }

    fetchProjects();

  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}