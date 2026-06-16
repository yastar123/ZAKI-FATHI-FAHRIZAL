import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/data/portfolio";

function AnimatedNumber({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
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
        start += (end / totalSteps);
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
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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
    <section id="about" className="py-32 relative bg-card border-y border-border bg-grid-pattern">
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex items-center gap-4 mb-16 font-mono text-xs tracking-widest text-primary">
          <div className="w-2 h-2 bg-primary animate-blink" />
          SYSTEM STATUS: ONLINE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 relative">
          
          <div className="hidden lg:block absolute left-[33%] top-0 bottom-0 w-1 bg-border" />
          
          <motion.div variants={itemVariants} className="lg:col-span-4 pr-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-12">
              <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">01 // Profile</span>
              System 
              <span className="text-primary">Specs</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed font-light text-muted-foreground">
                {DATA.about.bio}
              </p>
            </div>
          </motion.div>
          
          <div className="lg:col-span-8 lg:pl-12">
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-12 font-mono">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8">
                <div className="text-sm text-muted-foreground mb-4 md:mb-0 uppercase tracking-widest">Cumulative GPA</div>
                <div className="text-6xl lg:text-8xl text-foreground font-light leading-none">
                  <AnimatedNumber value={3.64} />
                  <span className="text-2xl text-muted-foreground">/4.00</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8">
                <div className="text-sm text-muted-foreground mb-4 md:mb-0 uppercase tracking-widest">UNSW WAM</div>
                <div className="text-6xl lg:text-8xl text-foreground font-light leading-none">
                  <AnimatedNumber value={76.67} />
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>
              
              <div className="flex flex-col justify-center border-b border-border pb-8">
                <div className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">Award</div>
                <div className="text-xl md:text-2xl text-primary uppercase leading-relaxed font-bold">
                  {DATA.about.scholarship.split('—')[0]}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {DATA.about.scholarship.split('—')[1]}
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}