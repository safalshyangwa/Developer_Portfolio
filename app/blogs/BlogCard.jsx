"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  return (
    <Link href={`/blogs/${blog._id}`}>
      {/* Motion div with hover animation */}
      <motion.div
        whileHover={{ scale: 1.05 }}  // slightly grow on hover
        whileTap={{ scale: 0.95 }}    // shrink on tap/click
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
      >
        {/* Project Image */}
        {blog.image && (
          <img
            src={`http://localhost:8000/uploads/${blog.image}`}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-5">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">{blog.description}</p>

          {/* Tech Stack */}
          
        </div>
      </motion.div>
    </Link>
  );
}