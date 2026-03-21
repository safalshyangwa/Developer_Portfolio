"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <Link href={`/projects/${project._id}`}>
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={{
          rest: { y: 0 },
          hover: { y: 8 }, // 👈 slight downward movement
        }}
        transition={{ duration: 0.3 }}
        className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg cursor-pointer "
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {project.image && (
            <motion.img
              src={`http://localhost:8000/uploads/${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.15 }, // 🔥 zoom effect
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition" />
        </div>

        {/* Content */}
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -8 },
          }}
          transition={{ duration: 0.3 }}
          className="p-5"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {project.title}
          </h2>

          <motion.p
            variants={{
              rest: { opacity: 0.7, y: 0 },
              hover: { opacity: 1, y: -4 }, // 👈 subtle lift + fade-in
            }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 text-sm mb-3 line-clamp-2"
          >
            {project.description}
          </motion.p>
          {/* Tech Stack (YOUR LOGIC PRESERVED) */}
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition pointer-events-none" />
      </motion.div>
    </Link>
  );
}
