import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { DATA } from "@/data/portfolio";

function AnimatedNumber({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalSteps = Math.min(end * 10, 60); // Adjust steps based on value
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col">
              <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">01 // Profile</span>
              System 
              <span className="text-primary">Specs</span>
            </h2>
          </motion.div>
          
          <div className="lg:col-span-8">
            <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
              <p className="text-xl sm:text-2xl leading-relaxed font-light text-foreground mb-16 border-l-4 border-muted pl-6">
                {DATA.about.bio}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
              <div className="border border-border bg-background p-8 relative group hover:border-primary transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary -translate-x-[1px] -translate-y-[1px]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary translate-x-[1px] translate-y-[1px]" />
                
                <div className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">Cumulative GPA</div>
                <div className="text-4xl lg:text-5xl text-foreground font-light mb-2">
                  <AnimatedNumber value={3.64} />
                  <span className="text-xl text-muted-foreground">/4.00</span>
                </div>
                <div className="mt-6 h-1 w-full bg-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "91%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-primary relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                  </motion.div>
                </div>
              </div>
              
              <div className="border border-border bg-background p-8 relative group hover:border-secondary transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-secondary -translate-x-[1px] -translate-y-[1px]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary translate-x-[1px] translate-y-[1px]" />
                
                <div className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">UNSW WAM</div>
                <div className="text-4xl lg:text-5xl text-foreground font-light mb-2">
                  <AnimatedNumber value={76.67} />
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
                <div className="mt-6 h-1 w-full bg-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "76.67%" }}
                    transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-secondary relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary shadow-[0_0_10px_rgba(255,191,0,0.8)]" />
                  </motion.div>
                </div>
              </div>
              
              <div className="border border-border bg-background p-8 sm:col-span-3 lg:col-span-1 relative group hover:border-primary transition-colors flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary -translate-x-[1px] -translate-y-[1px]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary translate-x-[1px] translate-y-[1px]" />
                
                <div className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">Award</div>
                <div className="text-sm md:text-base text-foreground uppercase leading-relaxed font-bold">
                  {DATA.about.scholarship.split('—')[0]}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
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
