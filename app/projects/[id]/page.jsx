"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { projectAPI } from "@/services/project.service";
import Link from "next/link";

export default function ProjectDetailPage() {
 // destructure directly
 const params = useParams();
  const id = params?.id;
  
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null); // optional error handling

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await projectAPI.getPortfolioById(id);
        console.log(res.data)
        setProject(res.data);
   
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!project) return <p className="text-center mt-10">No project found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-20">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-4">{project.description}</p>

        {project.image && (
          <img
            src={`http://localhost:8000/uploads/${project.image}`} // ensure consistent backend URL
            alt={project.title}
            className="rounded-lg max-h-96 w-full object-cover mb-4"
          />
        )}

        <p className="text-gray-500 text-sm">
          Created at: {new Date(project.createdAt).toLocaleString()}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack?.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <button><Link href="/projects">Back</Link></button>
      </div>

    </div>
  );
}