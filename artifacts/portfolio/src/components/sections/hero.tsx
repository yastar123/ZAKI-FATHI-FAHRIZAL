import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { BlueprintBg } from "@/components/ui/blueprint-bg";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0 z-0">
        <BlueprintBg />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10 pointer-events-none" />

      {/* Floating HUD readouts */}
      <div className="absolute top-24 right-6 md:right-12 z-20 font-mono text-[10px] md:text-xs text-primary border border-primary/30 p-2 bg-background/50 backdrop-blur-sm hidden sm:block">
        <div>SYS_TEMP: 23.4C <span className="animate-blink">_</span></div>
        <div>RENDER_FPS: 60</div>
        <div>UPTIME: 100%</div>
      </div>

      <motion.div 
        className="container mx-auto px-6 z-20 relative"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-primary mb-8 flex items-center gap-4 text-xs md:text-sm tracking-widest"
        >
          <span className="h-[1px] w-12 bg-primary inline-block" />
          <span>SYSTEM.INIT // UNSW_ENGINEERING</span>
        </motion.div>
        
        <div className="relative font-display text-[15vw] sm:text-[12vw] leading-[0.85] tracking-tight uppercase z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="glitch-text"
          >
            ZAKI FATHI
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-outline-primary ml-[5vw] hover:text-primary transition-colors duration-500 cursor-default glitch-text-2"
          >
            FAHRIZAL
          </motion.div>
        </div>

        <motion.div 
          className="max-w-xl border-l-2 border-primary pl-6 py-2 mt-16 backdrop-blur-sm bg-background/30 relative"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary" />
          <h2 className="text-xl sm:text-2xl font-mono text-foreground uppercase tracking-wide leading-tight">
            {DATA.role}
          </h2>
          <div className="mt-6 flex flex-col gap-2 font-mono text-sm text-muted-foreground uppercase">
            <span className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Specialization: CFD • FEA • Mechanical Design</span>
            <span className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Status: Available for opportunities</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decorative technical elements */}
      <div className="absolute right-12 bottom-24 z-20 hidden lg:flex flex-col items-end gap-2 font-mono text-xs text-muted-foreground/50">
        <span>LAT: -33.9173</span>
        <span>LON: 151.2313</span>
        <span>COORD: SYDNEY, AU</span>
        <div className="w-[1px] h-24 bg-border mt-4" />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-6 sm:left-12 z-20 font-mono flex items-center gap-4 text-xs text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={12} className="text-primary" />
          </motion.div>
        </div>
        <span>SCROLL_INIT</span>
      </motion.div>
    </section>
  );
}