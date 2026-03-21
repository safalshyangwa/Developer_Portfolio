"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket } from 'lucide-react';


const About = () => {
  const skills = [
    "Next.js", "TypeScript", "Tailwind CSS", 
    "Node.js", "Framer Motion", "PostgreSQL",
    "Python","C","Django","HTML","CSS","Express.js","shadcn"
  ];

  return (
    <>
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Decorative Background Frame */}
            <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              {/* Replace with your image path */}
              <Image 
                src="/safal.jpeg" 
                alt="Safal's Portrait"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl hidden lg:block">
              <p className="text-3xl font-bold text-indigo-400">1+</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Years of Crafting</p>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              My Journey as a <span className="text-indigo-400">Developer</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I'm Safal, a passionate developer dedicated to building digital products that combine 
              functional code with beautiful design. My journey began with a curiosity about how 
              the web works, which quickly evolved into a professional career in full-stack development.
            </p>

            {/* Quick Highlights */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Code2 size={20}/></div>
                <div>
                  <h4 className="text-slate-200 font-medium">Clean Code</h4>
                  <p className="text-xs text-slate-500">Readable & Scalable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Globe size={20}/></div>
                <div>
                  <h4 className="text-slate-200 font-medium">Global Reach</h4>
                  <p className="text-xs text-slate-500">Accessible Design</p>
                </div>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm hover:border-indigo-500 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  
</>
  );
};

export default About;
