"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AcheivmentCard from "./AchievmentCard";
import { acheivementAPI } from "@/services/achievement.service";

export default function Achievments() {
  const [achievments, setAchievments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchachievments() {
      try {
        const res = await acheivementAPI.getAllacheivement();
        setAchievments(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchachievments();
  }, []);

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
          🏆 Achievements
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Highlights of my milestones and accomplishments
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
      ) : !achievments.length ? (
        <p className="text-center mt-10">No Achievements found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {achievments.map((p) => (
            <AcheivmentCard key={p._id} achievment={p} />
          ))}
        </div>
      )}
    </div>
  );
}
