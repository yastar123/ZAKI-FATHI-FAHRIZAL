import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "SKILLS", href: "#skills" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 border-b ${
          scrolled ? "bg-background/90 backdrop-blur-md border-border" : "bg-transparent border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
            <a href="#" className="font-bold tracking-tight text-sm text-foreground hover:text-primary transition-colors">
              Z.FAHRIZAL
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.filter(l => l.name !== "CONTACT").map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group text-[11px]"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:block text-right text-muted-foreground border border-border px-3 py-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all relative overflow-hidden group text-[11px]"
            >
              <span className="relative z-10">INIT_CONTACT</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="h-[1px] bg-primary w-full origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-background/98 backdrop-blur-xl border-l border-border z-40 flex flex-col pt-20 pb-8 px-8"
          >
            <div className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-8 uppercase">Navigation</div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/50 flex items-center gap-3 group"
                >
                  <span className="text-primary/40 group-hover:text-primary transition-colors text-xs">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto font-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                STATUS: ONLINE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
