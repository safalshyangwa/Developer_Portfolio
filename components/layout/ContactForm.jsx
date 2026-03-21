"use client"

import { contactAPI } from "@/services/contact.service";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const res = await contactAPI.contact(form);
     toast.success("Message sent successfully!");
   } catch (error) {
     console.error(error);
     toast.error("Failed to send message");
   }
 };
  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <motion.div
        className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          variants={itemVariants}
        >
          Contact Me
        </motion.h2>

        <motion.form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-5"
          variants={containerVariants} // for staggered children
        >
          <motion.input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            variants={itemVariants}
          />

          <motion.input
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            variants={itemVariants}
          />

          <motion.textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            onChange={handleChange}
            className="bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            variants={itemVariants}
          />

          <motion.button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 text-white font-semibold shadow-lg hover:shadow-blue-500/30"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message 🚀
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}