import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { Cpu, LayoutTemplate, Activity, Settings2, ShieldCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJECT_01_IMAGES } from "@/data/project-images";

const ICONS = [Cpu, Activity, LayoutTemplate, Settings2, ShieldCheck];

function ProjectImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight" && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! + 1) % PROJECT_01_IMAGES.length);
      }
      if (e.key === "ArrowLeft" && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! - 1 + PROJECT_01_IMAGES.length) % PROJECT_01_IMAGES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const heroImage = PROJECT_01_IMAGES[0];
  const gridImages = PROJECT_01_IMAGES.slice(1);

  return (
    <div className="mt-16 w-full">
      <div className="flex items-center gap-4 mb-8">
        <h4 className="font-mono text-sm tracking-widest text-primary uppercase">VISUAL_EVIDENCE //</h4>
        <div className="h-[1px] flex-grow bg-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 bottom-0 left-0 w-1/4 bg-primary"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </div>

      <div 
        className="w-full aspect-video relative overflow-hidden group cursor-pointer mb-8"
        onClick={() => setSelectedIndex(0)}
        data-testid="project-image-0"
      >
        <img 
          src={heroImage.src} 
          alt={heroImage.caption}
          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500 blur-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 font-mono text-sm text-white">
          <span className="bg-primary text-primary-foreground px-2 py-1 text-xs mr-3 font-bold uppercase">{heroImage.type}</span>
          {heroImage.caption}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridImages.map((img, idx) => {
          const actualIndex = idx + 1;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative aspect-[4/3] group overflow-hidden cursor-pointer bg-muted border border-border"
              onClick={() => setSelectedIndex(actualIndex)}
              data-testid={`project-image-${actualIndex}`}
            >
              <img 
                src={img.src} 
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out blur-0"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground font-mono text-[10px] px-2 py-0.5 uppercase z-10 shadow-sm">
                {img.type}
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                <p className="text-white font-mono text-xs line-clamp-2">{img.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
            data-testid="lightbox-overlay"
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              data-testid="lightbox-close"
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! - 1 + PROJECT_01_IMAGES.length) % PROJECT_01_IMAGES.length);
              }}
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={48} />
            </button>

            <div 
              className="relative max-w-[90vw] max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={PROJECT_01_IMAGES[selectedIndex].src} 
                alt={PROJECT_01_IMAGES[selectedIndex].caption}
                className="max-h-[80vh] object-contain mx-auto"
              />
              <div className="mt-4 text-center font-mono text-sm text-white/80">
                <span className="text-primary mr-3">[{selectedIndex + 1}/{PROJECT_01_IMAGES.length}]</span>
                {PROJECT_01_IMAGES[selectedIndex].caption}
              </div>
            </div>

            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! + 1) % PROJECT_01_IMAGES.length);
              }}
              data-testid="lightbox-next"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col"
        >
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">02 // Showcase</span>
          Technical 
          <span className="text-primary">Projects</span>
        </motion.h2>
      </div>

      <div className="flex flex-col w-full">
        {DATA.projects.map((project, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              Icon={Icon}
            />
          )
        })}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, Icon }: { project: any, index: number, Icon: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <article 
      ref={cardRef}
      className="group relative border-t border-border py-24 hover:bg-card transition-colors duration-700 overflow-hidden w-full"
    >
      {/* Background massive number */}
      <motion.div 
        style={{ y }}
        className="absolute right-[-5%] top-1/4 text-[25vw] font-display font-bold text-muted/10 pointer-events-none select-none -z-10 group-hover:text-primary/10 transition-colors duration-700 leading-none"
      >
        {project.id}
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-6 z-10 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Meta Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex items-center gap-4 text-primary">
              <Icon size={32} strokeWidth={1.5} />
              <div className="h-[1px] flex-grow bg-border" />
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold uppercase leading-[1.1] mb-6 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-mono text-muted-foreground border-l-2 border-primary/50 pl-4 py-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground/50">ROLE</span>
                  <span className="text-foreground">{project.role}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground/50">DATE</span>
                  <span className="text-foreground">{project.date}</span>
                </div>
                <div className="flex flex-col col-span-2 mt-2">
                  <span className="text-xs text-muted-foreground/50">ORGANIZATION</span>
                  <span className="text-primary">{project.company}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tools.map((tool: string) => (
                <span key={tool} className="text-xs font-mono border border-border px-3 py-1.5 bg-background text-muted-foreground group-hover:border-primary/30 transition-colors">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-10 text-sm md:text-base font-light">
            <div className="bg-background/50 border border-border p-8 relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/50 translate-x-[1px] -translate-y-[1px]" />
              <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary inline-block" /> Mission Objective
              </h4>
              <p className="text-foreground leading-relaxed">
                {project.what}
              </p>
            </div>

            {project.problem && (
              <div className="pl-6 border-l border-border relative">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-secondary" />
                <h4 className="font-mono text-xs tracking-widest text-secondary uppercase mb-3">
                  Problem Statement
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}
            
            <div className="pl-6 border-l border-border relative">
              <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-3">
                Methodology
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {project.method}
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8 relative overflow-hidden group-hover:bg-primary/10 transition-colors">
              <h4 className="font-mono text-xs tracking-widest text-foreground uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground inline-block" /> Key Results
              </h4>
              <p className="text-foreground font-medium leading-relaxed">
                {project.result}
              </p>
            </div>

            {project.id === "01" && <ProjectImageGallery />}
          </div>

        </div>
      </motion.div>
    </article>
  );
}