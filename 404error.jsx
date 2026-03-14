"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glows (Matching Home Page) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Animated 404 Text */}
        <h1 className="text-[12rem] md:text-[15rem] font-black text-slate-900 leading-none select-none">
          404
        </h1>
        
        {/* Floating Error Message */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Lost in Space?
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved to another galaxy.
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/20 group"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-8 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Text */}
      <p className="absolute bottom-8 text-slate-600 text-sm">
        Error Code: <span className="font-mono text-indigo-400">PAGE_NOT_FOUND</span>
      </p>
    </div>
  );
}
