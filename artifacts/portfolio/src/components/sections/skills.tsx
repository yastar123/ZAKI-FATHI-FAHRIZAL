import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/data/portfolio";

export default function Skills() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-background">
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-24">
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">04 // Database</span>
          Core 
          <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <SkillCard 
            id="SYS.01" 
            title="CAD / Design" 
            skills={DATA.skills.cad} 
            colorClass="text-primary" 
            bgClass="bg-primary"
            borderColorClass="border-primary"
            variants={cardVariants}
          />

          <SkillCard 
            id="SYS.02" 
            title="Simulation" 
            skills={DATA.skills.simulation} 
            colorClass="text-secondary" 
            bgClass="bg-secondary"
            borderColorClass="border-secondary"
            variants={cardVariants}
          />

          <SkillCard 
            id="SYS.03" 
            title="Programming / Data" 
            skills={DATA.skills.programming} 
            colorClass="text-primary" 
            bgClass="bg-primary"
            borderColorClass="border-primary"
            variants={cardVariants}
          />

        </div>
      </motion.div>
      
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] flex items-center justify-center -translate-y-1/2">
        <div className="text-[25vw] font-display font-bold whitespace-nowrap leading-none">
          SYSTEM_SKILLS
        </div>
      </div>
    </section>
  );
}

function SkillCard({ id, title, skills, colorClass, bgClass, borderColorClass, variants }: any) {
  return (
    <motion.div variants={variants} className="border border-border bg-card p-10 relative group hover:border-muted-foreground transition-colors">
      <div className="absolute top-0 right-0 bg-muted px-4 py-2 font-mono text-xs text-muted-foreground tracking-widest border-b border-l border-border group-hover:text-foreground transition-colors">
        {id}
      </div>
      
      <h3 className={`text-2xl font-display tracking-wide uppercase mb-8 text-foreground border-b border-border pb-6 flex items-center gap-3`}>
        <div className={`w-2 h-2 ${bgClass}`} />
        {title}
      </h3>
      
      <ul className="space-y-6 font-mono text-sm">
        {skills.map((skill: string, index: number) => (
          <li key={skill} className="relative">
            <div className="flex justify-between items-center mb-2 z-10 relative">
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
              <span className={`${colorClass} opacity-70`}>100%</span>
            </div>
            {/* Progress bar background */}
            <div className="h-[2px] w-full bg-muted">
              {/* Progress bar fill with animation */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                viewport={{ once: true }}
                className={`h-full ${bgClass} opacity-50 group-hover:opacity-100 transition-opacity`} 
              />
            </div>
          </li>
        ))}
      </ul>
      
      {/* Hover corner brackets */}
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColorClass} opacity-0 group-hover:opacity-100 transition-opacity translate-x-[2px] translate-y-[2px]`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColorClass} opacity-0 group-hover:opacity-100 transition-opacity -translate-x-[2px] translate-y-[2px]`} />
    </motion.div>
  );
}
