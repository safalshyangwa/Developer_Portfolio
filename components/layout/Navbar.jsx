

"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1); // New state for opacity

  const navLinks = [
    { name: 'Home', href: '/' },
    { name:'About', href:'/about' },
    { name: 'Projects', href: '/projects' },
    { name:'Achievements', href:'/achievments' },
    { name:'Blogs', href:'/blogs' },
    { name: 'Admin', href: '/login' },
  ];

  // Listen to scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Reduce opacity a bit after scrolling 50px, min opacity 0.7
      const newOpacity = Math.max(0.7, 1 - scrollTop / 500);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{ opacity }} // Apply dynamic opacity
      className="fixed w-full z-50 top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 transition-opacity duration-300 mb-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Safal lama
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group px-3 py-2 transition-colors duration-300 ${
                    link.name === "Admin"
                      ? "bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.name !== "Admin" && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-slate-900 border-b border-slate-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-slate-300 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;