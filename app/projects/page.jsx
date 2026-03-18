// "use client";
// import { useEffect, useState } from "react";
// import ProjectCard from "@/app/projects/ProjectCard";
// import { projectAPI } from "@/services/project.service";

// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const res = await projectAPI.getAllPortfolios();
//         setProjects(res.data);
//       } catch (err) {
//         console.error("Failed to fetch projects:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProjects();
//   }, []);

//   // Skeleton loader component
//   const SkeletonCard = () => (
//     <div className="animate-pulse bg-slate-800 rounded-xl h-60 w-full" />
//   );

//   if (loading) {
//     return (
//       <div className="grid md:grid-cols-3 gap-6 p-4">
//         {/* Render 6 skeleton cards while loading */}
//         {Array.from({ length: 6 }).map((_, idx) => (
//           <SkeletonCard key={idx} />
//         ))}
//       </div>
//     );
//   }

//   if (!projects.length)
//     return <p className="text-center mt-10">No projects found.</p>;

//   return (
//     <div className="grid md:grid-cols-3 gap-6 p-4 mt-20">
//       {projects.map((p) => (
//         <ProjectCard key={p._id} project={p} />
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/app/projects/ProjectCard";
import { projectAPI } from "@/services/project.service";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await projectAPI.getAllPortfolios();
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-slate-800 rounded-xl h-60 w-full" />
  );

  return (
    <div className="px-4 mt-20">
      {/* 🔥 Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Projects
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          A collection of things I’ve built and worked on
        </p>
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : !projects.length ? (
        <p className="text-center mt-10">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}