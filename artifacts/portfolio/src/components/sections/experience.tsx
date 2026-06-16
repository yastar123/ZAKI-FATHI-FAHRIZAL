import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/portfolio";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export default function Experience() {
  const containerRef = useRef(null);

  return (
    <section id="experience" ref={containerRef} className="py-20 md:py-32 relative bg-card border-y border-border overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent pointer-events-none mr-24 hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-16 md:mb-28"
        >
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">03 // Timeline</span>
          Work
          <span className="text-primary">Experience</span>
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Timeline Line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-20">
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

function TimelineItem({ exp, isEven, index }: { exp: any; isEven: boolean; index: number }) {
  const isDesktop = useIsDesktop();
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 90%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const xOffset = isEven ? -40 : 40;
  const x = useTransform(scrollYProgress, [0, 1], [isDesktop ? xOffset : 0, 0]);

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""} gap-6 md:gap-8 items-start`}
    >
      {/* Timeline Dot */}
      <motion.div
        style={{ scale }}
        className="absolute left-[18px] md:left-1/2 w-9 h-9 md:w-10 md:h-10 bg-background border-2 border-primary flex items-center justify-center -translate-x-1/2 mt-2 z-10 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
      >
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary animate-pulse" />
      </motion.div>

      {/* Connector Line — desktop only */}
      <div
        className={`absolute top-6 h-[1px] bg-primary/30 hidden md:block w-[calc(50%-20px)] ${
          isEven ? "right-1/2" : "left-1/2"
        }`}
      />

      {/* Content Box */}
      <motion.div
        style={{ opacity, x }}
        className={`w-full md:w-1/2 pl-12 sm:pl-14 md:pl-0 ${
          isEven ? "md:pl-12 md:pr-0" : "md:pr-12 md:pl-0"
        }`}
      >
        <div className="border border-border bg-background p-5 sm:p-7 md:p-8 hover:border-primary transition-all duration-500 relative group shadow-2xl">
          {/* Engineering corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

          <div className="absolute top-0 right-0 bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
            EXP_{String(index + 1).padStart(2, "0")}
          </div>

          <div className="text-xs font-mono text-primary mb-3 tracking-widest">{exp.date}</div>
          <h3 className="text-xl sm:text-2xl font-display tracking-wide uppercase mb-2 group-hover:text-primary transition-colors leading-tight">
            {exp.title}
          </h3>
          <div className="text-xs sm:text-sm font-mono text-muted-foreground mb-5 uppercase border-b border-border pb-5">
            {exp.company}
          </div>

          <ul className="space-y-3 sm:space-y-4">
            {exp.points.map((point: string, i: number) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-3">
                <span className="text-primary font-mono mt-0.5 flex-shrink-0">{">"}</span>
                <span className="leading-relaxed font-light">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
