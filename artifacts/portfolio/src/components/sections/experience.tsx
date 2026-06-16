import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/portfolio";

export default function Experience() {
  const containerRef = useRef(null);
  
  return (
    <section id="experience" ref={containerRef} className="py-32 relative bg-card border-y border-border overflow-hidden">
      {/* Technical Background element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent pointer-events-none mr-24 hidden lg:block" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-32"
        >
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">03 // Timeline</span>
          Work 
          <span className="text-primary">Experience</span>
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2" />

          <div className="flex flex-col gap-24">
            {DATA.experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <TimelineItem key={exp.id} exp={exp} isEven={isEven} index={index} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, isEven, index }: { exp: any, isEven: boolean, index: number }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 90%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const xOffset = isEven ? -50 : 50;
  const x = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);

  return (
    <div ref={itemRef} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} gap-8 items-start`}>
      
      {/* Timeline Dot */}
      <motion.div 
        style={{ scale }}
        className="absolute left-[20px] md:left-1/2 w-10 h-10 bg-background border-2 border-primary rounded-none flex items-center justify-center -translate-x-1/2 mt-2 z-10 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
      >
        <div className="w-3 h-3 bg-primary animate-pulse" />
      </motion.div>

      {/* Connect Line */}
      <div className={`absolute top-7 h-[1px] bg-primary/30 hidden md:block w-[calc(50%-20px)] ${isEven ? 'right-1/2' : 'left-1/2'}`} />

      {/* Content Box */}
      <motion.div 
        style={{ opacity, x: window.innerWidth > 768 ? x : 0 }}
        className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 data-[even=true]:md:pl-16 data-[even=true]:md:pr-0" 
        data-even={isEven}
      >
        <div className="border border-border bg-background p-8 hover:border-primary transition-all duration-500 relative group shadow-2xl">
          {/* Engineering corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />
          
          <div className="absolute top-0 right-0 bg-muted px-3 py-1 font-mono text-xs text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
            EXP_{String(index + 1).padStart(2, '0')}
          </div>

          <div className="text-xs font-mono text-primary mb-4 tracking-widest">{exp.date}</div>
          <h3 className="text-2xl font-display tracking-wide uppercase mb-2 group-hover:text-primary transition-colors">{exp.title}</h3>
          <div className="text-sm font-mono text-muted-foreground mb-6 uppercase border-b border-border pb-6">{exp.company}</div>
          
          <ul className="space-y-4">
            {exp.points.map((point: string, i: number) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-3">
                <span className="text-primary font-mono mt-0.5">{'>'}</span>
                <span className="leading-relaxed font-light">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
