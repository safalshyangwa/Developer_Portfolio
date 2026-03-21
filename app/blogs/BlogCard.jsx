"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  // Limit the description to a snippet for preview
  const previewLength = 120; // characters
  const previewText =
    blog.description.length > previewLength
      ? blog.description.slice(0, previewLength) + "..."
      : blog.description;

  return (
    <Link href={`/blogs/${blog._id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer flex flex-col h-[450px]" // fixed height
      >
        {/* Blog Image */}
        <div className="h-48 w-full overflow-hidden">
          {blog.image ? (
            <img
              src={`http://localhost:8000/uploads/${blog.image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
        </div>

        <div className="p-5 flex flex-col justify-between flex-1">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">
            {blog.title}
          </h2>

          {/* Preview Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {previewText}
          </p>

          {/* Read More Button */}
          <span className="self-start text-indigo-400 hover:text-indigo-500 font-medium">
            Read More &rarr;
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
