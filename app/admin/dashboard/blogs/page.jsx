"use client";

import { blogAPI } from "@/services/blog.serve";
import { useState } from "react";

export default function BlogForm() {

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await blogAPI.createablog(data)

   
    };

    const data = await res.json();
    alert(data.message || "Blog created!");
    setBlog({ title: "", content: "", author: "", image: "" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Blog</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          />

          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Content"
            rows={5}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            type="text"
            name="image"
            value={blog.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-indigo-500/30"
          >
            Add Blog 🚀
          </button>
        </form>
      </div>
    </section>
  );
}