"use client";
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import  Link  from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-indigo-400 font-medium tracking-widest uppercase text-sm mb-4">
            Welcome to my world
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Safal</span>
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-4xl font-mono text-slate-300 h-20">
            <Typewriter
              options={{
                strings: ['Full Stack Developer', 'UI/UX Designer', 'Open Source Contributor'],
                autoStart: true,
                loop: true,
                wrapperClassName: "text-slate-200",
                cursorClassName: "text-indigo-500 animate-blink"
              }}
            />
          </div>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            I craft high-performance web applications and beautiful digital experiences 
            using Next.js, Tailwind CSS, and modern animations.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projects">
  <button className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25">
    View My Work
    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
  </button>
</Link>
           <a 
  href="/resume.pdf" 
  download="safalresume.pdf"
  className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-8 py-4 rounded-full transition-all"
>
  Resume
  <Download size={18} />
</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
