import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { DATA } from "@/data/portfolio";

const PROJECT_BADGES: Record<string, string> = {
  "01": "CFD",
  "02": "FEA",
  "03": "Biomedical",
  "04": "ROV",
  "05": "Structural",
};

const PROJECT_BADGE_COLORS: Record<string, string> = {
  "01": "bg-blue-100 text-blue-600",
  "02": "bg-violet-100 text-violet-600",
  "03": "bg-rose-100 text-rose-600",
  "04": "bg-emerald-100 text-emerald-600",
  "05": "bg-amber-100 text-amber-600",
};

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProjectsOpen(false);
  }, [location]);

  const handleProjectsEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setProjectsOpen(true);
  };

  const handleProjectsLeave = () => {
    hoverTimeout.current = setTimeout(() => setProjectsOpen(false), 150);
  };

  const isProjectsActive = location.startsWith("/projects");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || projectsOpen
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <span className="font-bold text-foreground text-lg tracking-tight cursor-pointer hover:text-primary transition-colors">
              Zaki<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home */}
            <Link href="/">
              <span
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  location === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Home
              </span>
            </Link>

            {/* Projects with dropdown */}
            <div
              ref={projectsRef}
              className="relative"
              onMouseEnter={handleProjectsEnter}
              onMouseLeave={handleProjectsLeave}
            >
              <Link href="/projects">
                <span
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    isProjectsActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  Projects
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </Link>

              {/* Dropdown */}
              {projectsOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Projects</p>
                  </div>
                  <div className="py-1.5">
                    {DATA.projects.map((p) => (
                      <Link key={p.id} href={`/projects/${p.id}`}>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors cursor-pointer group">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${PROJECT_BADGE_COLORS[p.id] || "bg-gray-100 text-gray-600"}`}>
                            {PROJECT_BADGES[p.id] || `#${p.id}`}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{p.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{p.company}</p>
                          </div>
                          <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border px-4 py-2.5">
                    <Link href="/projects">
                      <span className="text-xs text-primary font-medium hover:underline cursor-pointer flex items-center gap-1">
                        View all projects overview
                        <ArrowRight size={11} />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            <Link href="/skills">
              <span
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  location === "/skills"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Skills
              </span>
            </Link>

            {/* Experience */}
            <Link href="/experience">
              <span
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  location === "/experience"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Experience
              </span>
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:zakifathi987@gmail.com"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-border z-50 md:hidden shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              <Link href="/">
                <span className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${location === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                  Home
                </span>
              </Link>

              {/* Projects section */}
              <div className="px-4 pt-3 pb-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Projects</p>
                <Link href="/projects">
                  <span className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer mb-1 ${isProjectsActive && !location.includes("/projects/") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                    All Projects
                  </span>
                </Link>
                {DATA.projects.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${location === `/projects/${p.id}` ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${PROJECT_BADGE_COLORS[p.id]}`}>
                        {PROJECT_BADGES[p.id]}
                      </span>
                      <span className="truncate">{p.title}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/skills">
                <span className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${location === "/skills" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                  Skills
                </span>
              </Link>
              <Link href="/experience">
                <span className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${location === "/experience" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                  Experience
                </span>
              </Link>
              <a
                href="mailto:zakifathi987@gmail.com"
                className="mt-2 px-4 py-3 bg-primary text-white text-sm font-medium rounded-md text-center hover:bg-primary/90 transition-colors"
              >
                Contact Me
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
