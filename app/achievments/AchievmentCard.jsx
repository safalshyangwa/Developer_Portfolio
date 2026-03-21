"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AcheivmentCard({ achievment }) {
  if (!achievment) return null;

  return (
    <Link href={`/achievments/${achievment._id}`}>
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {achievment.image && (
            <motion.img
              src={`http://localhost:8000/uploads/${achievment.image}`}
              className="w-full h-full object-cover"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.15 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
          </div>

          {/* Gradient Overlay */}

        {/* Content */}
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -8 },
          }}
          transition={{ duration: 0.3 }}
          className="p-5"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {achievment.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2">
            {achievment.description}
          </p>
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition pointer-events-none" />
      </motion.div>
    </Link>
  );
}
