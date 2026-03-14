"use client";

import ProjectForm from "@/components/ProjectForm";
import { projectAPI } from "@/services/project.service";

export default function CreateProject() {

  const handleCreate = async (data) => {

    try {

      await projectAPI.createProject(data);

      alert("Project created");

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="max-w-2xl mx-auto">

      <ProjectForm onSubmit={handleCreate} />

    </div>
  );
}