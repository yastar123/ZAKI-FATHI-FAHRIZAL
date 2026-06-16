import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { Cpu, LayoutTemplate, Activity, Settings2, ShieldCheck } from "lucide-react";

const ICONS = [Cpu, Activity, LayoutTemplate, Settings2, ShieldCheck];

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
          </div>

        </div>
      </motion.div>
    </article>
  );
}
