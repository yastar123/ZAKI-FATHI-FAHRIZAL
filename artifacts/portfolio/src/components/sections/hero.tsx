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

  const yText = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-14 md:pt-20">
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0 z-0">
        <BlueprintBg />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10 pointer-events-none" />

      {/* HUD readouts — desktop only */}
      <div className="absolute top-20 right-4 md:right-12 z-20 font-mono text-[10px] text-primary border border-primary/30 p-2 bg-background/50 backdrop-blur-sm hidden sm:block">
        <div>SYS_TEMP: 23.4°C <span className="animate-blink">_</span></div>
        <div>RENDER_FPS: 60</div>
        <div>UPTIME: 100%</div>
        <div>ANSYS_VER: 2025 R2</div>
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 z-20 relative"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-primary mb-6 md:mb-8 flex items-center gap-4 text-xs tracking-widest"
        >
          <span className="h-[1px] w-8 md:w-12 bg-primary inline-block" />
          <span>SYSTEM.INIT // UNSW_ENGINEERING</span>
        </motion.div>

        <div className="relative font-display text-[18vw] sm:text-[13vw] md:text-[12vw] leading-[0.85] tracking-tight uppercase z-10">
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
            className="text-outline-primary ml-[4vw] hover:text-primary transition-colors duration-500 cursor-default glitch-text-2"
          >
            FAHRIZAL
          </motion.div>
        </div>

        <motion.div
          className="max-w-xs sm:max-w-md lg:max-w-xl border-l-2 border-primary pl-4 md:pl-6 py-2 mt-10 md:mt-16 backdrop-blur-sm bg-background/30 relative"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary" />
          <h2 className="text-base sm:text-xl md:text-2xl font-mono text-foreground uppercase tracking-wide leading-tight">
            {DATA.role}
          </h2>
          <div className="mt-4 md:mt-6 flex flex-col gap-2 font-mono text-xs sm:text-sm text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="text-primary">{">"}</span> Specialization: CFD • FEA • Thermo-Structural
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">{">"}</span> Location: Sydney, AU + Baturaja, ID
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">{">"}</span> Status: Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#projects"
            className="font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-5 py-2.5 hover:bg-primary/90 transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">VIEW PROJECTS</span>
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">INIT CONTACT</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative coordinates — desktop */}
      <div className="absolute right-8 md:right-12 bottom-16 md:bottom-24 z-20 hidden lg:flex flex-col items-end gap-1.5 font-mono text-xs text-muted-foreground/40">
        <span>LAT: -3.3194° S</span>
        <span>LON: 104.1503° E</span>
        <span>BATURAJA, INDONESIA</span>
        <div className="w-[1px] h-16 md:h-24 bg-border mt-3" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-4 sm:left-12 z-20 font-mono flex items-center gap-3 md:gap-4 text-xs text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-primary flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={10} className="text-primary" />
          </motion.div>
        </div>
        <span className="hidden sm:block">SCROLL_INIT</span>
      </motion.div>

      {/* Horizontal data ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-border/30 overflow-hidden py-1.5 bg-background/20 backdrop-blur-sm hidden md:block">
        <motion.div
          className="flex gap-16 font-mono text-[10px] text-primary/50 whitespace-nowrap"
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {["ANSYS FEA ACTIVE", "TEMP: 1450°C MAX", "STRESS: 35-39 MPa", "KILN_LEN: 72m", "CFD: CONVERGING", "FEA: STATIC_STRUCTURAL", "MATERIAL: ASTM A516", "ZONE: BURNING", "SHELL_TEMP: 842°C", "COATING: 50mm REF", "ANSYS FEA ACTIVE", "TEMP: 1450°C MAX", "STRESS: 35-39 MPa", "KILN_LEN: 72m", "CFD: CONVERGING"].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="w-1 h-1 bg-primary/40 rounded-full" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
