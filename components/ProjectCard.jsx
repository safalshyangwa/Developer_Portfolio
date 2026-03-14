"use client";

import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition">

      {/* Project Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">
          {project.description}
        </p>

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

        {/* Links */}
        <div className="flex gap-3">

          <Link
            href={project.githubLink}
            target="_blank"
            className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded"
          >
            Github
          </Link>

          <Link
            href={project.liveLink}
            target="_blank"
            className="text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded"
          >
            Live
          </Link>

        </div>

      </div>
    </div>
  );
}