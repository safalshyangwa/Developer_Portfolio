"use client";

import { useEffect, useState } from "react";


import AchievementCard from "../admin/dashboard/achievments/AchievementCard";
import { acheivementAPI } from "@/services/achievement.service";

export default function Projects() {
  const [achievments, setAchievments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchachievments() {
      try {
        const res = await acheivementAPI.getAllacheivement();
        setAchievments(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchachievments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Achievments...</p>;
  if (!achievments.length) return <p className="text-center mt-10">No Achievments found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {achievments.map((p) => (
        <AchievementCard key={p._id} achievment={p} />
      ))}
    </div>
  );
}