import Link from 'next/link';
import { Github,Linkedin,Twitter,Mail } from 'lucide-react'; // Install lucide-react if you haven't

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail size={20} />, href: "safalshyangwa@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Brand/Name Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Safal's Portfolio
            </h2>
            <p className="mt-2 text-sm max-w-xs">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Social Links with Hover Effects */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-all duration-300 transform hover:-translate-y-1"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>
            &copy; {currentYear} All rights reserved to <span className="text-slate-200 font-semibold">Safal</span>.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
