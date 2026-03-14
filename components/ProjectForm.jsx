"use client";

import { useState } from "react";

export default function ProjectForm({ onSubmit, defaultValues }) {

  const [formData, setFormData] = useState({
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    githubLink: defaultValues?.githubLink || "",
    liveLink: defaultValues?.liveLink || "",
    techStack: defaultValues?.techStack?.join(",") || "",
    image: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleImage = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("githubLink", formData.githubLink);
    formPayload.append("liveLink", formData.liveLink);

    formPayload.append(
      "techStack",
      JSON.stringify(formData.techStack.split(","))
    );

    if (formData.image) {
      formPayload.append("image", formData.image);
    }

    onSubmit(formPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4"
    >

      <h2 className="text-xl font-semibold mb-4">
        Project Form
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full bg-slate-800 p-3 rounded border border-slate-700"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Project Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-slate-800 p-3 rounded border border-slate-700"
      />

      {/* Github */}
      <input
        type="text"
        name="githubLink"
        placeholder="Github Link"
        value={formData.githubLink}
        onChange={handleChange}
        className="w-full bg-slate-800 p-3 rounded border border-slate-700"
      />

      {/* Live */}
      <input
        type="text"
        name="liveLink"
        placeholder="Live Link"
        value={formData.liveLink}
        onChange={handleChange}
        className="w-full bg-slate-800 p-3 rounded border border-slate-700"
      />

      {/* Tech Stack */}
      <input
        type="text"
        name="techStack"
        placeholder="React, Node, MongoDB"
        value={formData.techStack}
        onChange={handleChange}
        className="w-full bg-slate-800 p-3 rounded border border-slate-700"
      />

      {/* Image */}
      <input
        type="file"
        onChange={handleImage}
        className="w-full"
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded"
      >
        Submit
      </button>

    </form>
  );
}