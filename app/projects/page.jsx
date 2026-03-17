"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/app/projects/ProjectCard";
import { projectAPI } from "@/services/project.service";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await projectAPI.getAllPortfolios();
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;
  if (!projects.length) return <p className="text-center mt-10">No projects found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}