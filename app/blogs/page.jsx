"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { blogAPI } from "@/services/blog.service";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const [blogs, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchblogs() {
      try {
        const res = await blogAPI.getAllblogs();
        setblogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchblogs();
  }, []);

  return (
    <div className="px-4 mt-20 ">
      {/* 🔥 Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">📝 Blogs</h1>
        <p className="text-gray-400 mt-2 text-sm">
          A collection of articles, tutorials, and my thoughts
        </p>

        {/* Optional underline */}
        
      </motion.div>

      {/* Loading */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-slate-800 rounded-xl h-60 w-full"
            />
          ))}
        </div>
      ) : !blogs.length ? (
        <p className="text-center mt-10">No Blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((p) => (
            <BlogCard key={p._id} blog={p} />
          ))}
        </div>
      )}
    </div>
  );
}
