import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "SKILLS", href: "#skills" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 border-b border-transparent ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
          <a href="#" className="font-bold tracking-tight text-sm text-foreground hover:text-primary transition-colors">
            Z.FAHRIZAL
          </a>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>
        
        <div className="hidden md:block text-right text-muted-foreground">
          <a href="#contact" className="border border-border px-4 py-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all relative overflow-hidden group">
            <span className="relative z-10">INIT_CONTACT</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </a>
        </div>
      </div>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="h-[1px] bg-primary w-full origin-left"
        style={{ scaleX }}
      />
    </motion.header>
  );
}
