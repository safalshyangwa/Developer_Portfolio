"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { projectAPI } from "@/services/project.service";

export default function EditProject() {

  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);

  useEffect(() => {

    async function fetchProject() {
      try {

        const data = await projectAPI.getProject(id);

        setProject(data.data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchProject();

  }, [id]);



  const handleUpdate = async (formData) => {

    try {

      await projectAPI.updateProject(id, formData);

      alert("Project Updated");

      router.push("/admin/projects");

    } catch (error) {
      console.error(error);
    }

  };


  if (!project) return <p>Loading...</p>;

  return (

    <div className="max-w-2xl mx-auto">

      <ProjectForm
        defaultValues={project}
        onSubmit={handleUpdate}
      />

    </div>

  );
}