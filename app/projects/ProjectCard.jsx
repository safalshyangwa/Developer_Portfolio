"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <Link href={`/projects/${project._id}`}>
      {/* Motion div with hover animation */}
      <motion.div
        whileHover={{ scale: 1.05 }}  // slightly grow on hover
        whileTap={{ scale: 0.95 }}    // shrink on tap/click
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
      >
        {/* Project Image */}
        {project.image && (
          <img
            src={`http://localhost:8000/uploads/${project.image}`}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-5">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}