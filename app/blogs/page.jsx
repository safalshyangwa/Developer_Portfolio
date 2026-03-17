"use client";

import { useEffect, useState } from "react";


import { blogAPI } from "@/services/blog.service";
import BlogCard from "./BlogCard";

export default function Projects() {
  const [blogs, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchblogs() {
      try {
        const res = await blogAPI.getAllblogs();
        setblogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchblogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (!blogs.length) return <p className="text-center mt-10">No Blogs found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {blogs.map((p) => (
        <BlogCard key={p._id} blog={p} />
      ))}
    </div>
  );
}