import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/data/portfolio";

function AnimatedNumber({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalSteps = Math.min(end * 10, 60);
      const incrementTime = (duration * 1000) / totalSteps;

      const timer = setInterval(() => {
        start += end / totalSteps;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Number(start.toFixed(2)));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="relative bg-card border-y border-border">
      {/* Main about content */}
      <div className="py-20 md:py-32 bg-grid-pattern">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 relative z-10"
        >
          <div className="flex items-center gap-4 mb-12 md:mb-16 font-mono text-xs tracking-widest text-primary">
            <div className="w-2 h-2 bg-primary animate-blink" />
            SYSTEM STATUS: ONLINE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
            <div className="hidden lg:block absolute left-[33%] top-0 bottom-0 w-[1px] bg-border" />

            <motion.div variants={itemVariants} className="lg:col-span-4 lg:pr-12">
              <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-10 md:mb-12">
                <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">01 // Profile</span>
                System
                <span className="text-primary">Specs</span>
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground">
                  {DATA.about.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {["CFD", "FEA", "Thermal Analysis", "Structural Mechanics", "Fluid Dynamics"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 bg-primary/5 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="lg:col-span-8 lg:pl-12">
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8 md:gap-12 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6 md:pb-8 gap-4">
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">Cumulative GPA</div>
                  <div className="text-5xl sm:text-6xl lg:text-8xl text-foreground font-light leading-none">
                    <AnimatedNumber value={3.64} />
                    <span className="text-xl sm:text-2xl text-muted-foreground">/4.00</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-6 md:pb-8 gap-4">
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">UNSW WAM</div>
                  <div className="text-5xl sm:text-6xl lg:text-8xl text-foreground font-light leading-none">
                    <AnimatedNumber value={76.67} />
                    <span className="text-xl sm:text-2xl text-muted-foreground">/100</span>
                  </div>
                </div>

                <div className="flex flex-col border-b border-border pb-6 md:pb-8">
                  <div className="text-sm text-muted-foreground mb-3 uppercase tracking-widest">Award</div>
                  <div className="text-lg md:text-2xl text-primary uppercase leading-relaxed font-bold">
                    {DATA.about.scholarship.split("—")[0]}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {DATA.about.scholarship.split("—")[1]}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div ref={statsRef} className="border-t border-border bg-background/50 py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {DATA.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary group-hover:glow-text-primary transition-all">
                  {statsInView && <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={1.5} />}
                  {!statsInView && <span>0{stat.suffix}</span>}
                </div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Used strip */}
      <div className="border-t border-border py-6 overflow-hidden bg-muted/30">
        <div className="relative flex">
          <motion.div
            className="flex gap-12 items-center font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest whitespace-nowrap"
            animate={{ x: [0, -800] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {["ANSYS 2025 R2", "SolidWorks", "CATIA", "ABAQUS", "MATLAB", "Python", "C+", "Arduino", "ANSYS Fluent", "ANSYS FEA", "SolidWorks Simulation", "CFD", "FEA", "Infrared Sensing", "ANSYS 2025 R2", "SolidWorks", "CATIA", "ABAQUS", "MATLAB"].map((tool, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="w-1 h-1 bg-primary/40 rounded-full inline-block" />
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
