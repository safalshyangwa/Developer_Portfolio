"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { projectAPI } from "@/services/project.service";
import { blogAPI } from "@/services/blog.service";

export default function BlogDetailPage() {
 // destructure directly
 const params = useParams();
  const id = params?.id;
  const [blog, setblog] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null); // optional error handling

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const res = await blogAPI.getAllblogById(id);
        setblog(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center mt-10">No project found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">{blog.description}</p>

        {blog.image && (
          <img
            src={`http://localhost:8000/uploads/${blog.image}`} // ensure consistent backend URL
            alt={blog.title}
            className="rounded-lg max-h-96 w-full object-cover mb-4"
          />
        )}

        <p className="text-gray-500 text-sm">
          Created at: {new Date(blog.createdAt).toLocaleString()}
        </p>

        {/* <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack?.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div> */}
      </div>

    </div>
  );
}