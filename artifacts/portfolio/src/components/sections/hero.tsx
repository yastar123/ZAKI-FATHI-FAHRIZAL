import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { BlueprintBg } from "@/components/ui/blueprint-bg";
import { ArrowDown, Cpu, Flame, Anchor, Activity } from "lucide-react";

const ACTIVE_DEPLOYMENTS = [
  { name: "CFD / Cyclone Separator", org: "PT Semen Baturaja", status: "RUNNING", color: "text-primary" },
  { name: "FEA / Rotary Kiln 72m", org: "PT Semen Baturaja", status: "RUNNING", color: "text-primary" },
  { name: "CFD / Total Artif. Heart", org: "UNSW Bionics Heart", status: "RUNNING", color: "text-primary" },
  { name: "ROV / AUV III Chassis", org: "sUNSWim", status: "BUILD", color: "text-secondary" },
  { name: "FEA / Knee Brace OA", org: "DESN2000 UNSW", status: "DONE", color: "text-muted-foreground" },
];

const KEY_METRICS = [
  { label: "Max Temp", value: "1450°C", sub: "Burning Zone" },
  { label: "Kiln Length", value: "72 m", sub: "FEA Model" },
  { label: "Safety Factor", value: ">13", sub: "Knee Brace" },
  { label: "Drag Coeff.", value: "0.97", sub: "AUV at 1 m/s" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const tickerItems = [
    "ANSYS FEA ACTIVE", "TEMP: 1450°C MAX", "STRESS: 35-39 MPa",
    "KILN_LEN: 72m", "CFD: CONVERGING", "MATERIAL: ASTM A516",
    "SHELL_TEMP: 842°C", "ROV: SAUVC_2026", "DRAG_Cd: 0.91-0.97",
    "HEART_FLOW: 5 L/min", "FoS: >13", "COATING: 50mm REF",
  ];

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-14 md:pt-20">
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0 z-0">
        <BlueprintBg />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10 pointer-events-none" />

      {/* HUD readouts top-right — sm+ */}
      <div className="absolute top-16 sm:top-20 right-3 sm:right-6 z-20 font-mono text-[9px] sm:text-[10px] text-primary border border-primary/30 p-1.5 sm:p-2 bg-background/50 backdrop-blur-sm hidden sm:block xl:hidden">
        <div>SYS_TEMP: 23.4°C <span className="animate-blink">_</span></div>
        <div>RENDER_FPS: 60</div>
        <div>UPTIME: 100%</div>
        <div>ANSYS_VER: 2025 R2</div>
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 z-20 relative"
        style={{ y: yText, opacity: opacityText }}
      >
        <div className="xl:grid xl:grid-cols-[1fr_300px] xl:gap-12 xl:items-center">

          {/* ── LEFT: main hero content ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-primary mb-5 md:mb-8 flex items-center gap-3 text-[10px] sm:text-xs tracking-widest"
            >
              <span className="h-[1px] w-6 sm:w-8 md:w-12 bg-primary inline-block" />
              <span>SYSTEM.INIT // UNSW_ENGINEERING</span>
            </motion.div>

            <div className="relative font-display text-[16vw] sm:text-[13vw] md:text-[12vw] xl:text-[8.5vw] leading-[0.85] tracking-tight uppercase z-10">
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
                className="text-outline-primary ml-[3vw] hover:text-primary transition-colors duration-500 cursor-default glitch-text-2"
              >
                FAHRIZAL
              </motion.div>
            </div>

            <motion.div
              className="max-w-[85vw] sm:max-w-md lg:max-w-lg border-l-2 border-primary pl-4 md:pl-6 py-2 mt-8 md:mt-12 backdrop-blur-sm bg-background/30 relative"
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary" />
              <h2 className="text-sm sm:text-xl md:text-2xl font-mono text-foreground uppercase tracking-wide leading-tight">
                {DATA.role}
              </h2>
              <div className="mt-3 md:mt-5 flex flex-col gap-1.5 font-mono text-[10px] sm:text-xs text-muted-foreground uppercase">
                <span className="flex items-center gap-2"><span className="text-primary">{">"}</span> CFD • FEA • Thermo-Structural Analysis</span>
                <span className="flex items-center gap-2"><span className="text-primary">{">"}</span> Sydney, AU + Baturaja, ID</span>
                <span className="flex items-center gap-2">
                  <span className="text-primary">{">"}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                    Available for Opportunities
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#projects"
                className="font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-primary text-primary-foreground px-5 py-3 hover:bg-primary/90 transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">VIEW PROJECTS</span>
              </a>
              <a
                href="#contact"
                className="font-mono text-[11px] sm:text-xs uppercase tracking-widest border border-primary text-primary px-5 py-3 hover:bg-primary hover:text-primary-foreground transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">INIT CONTACT</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
              </a>
              <a
                href="#about"
                className="font-mono text-[11px] sm:text-xs uppercase tracking-widest border border-border text-muted-foreground px-5 py-3 hover:border-primary hover:text-primary transition-all hidden sm:block"
              >
                SYSTEM SPECS
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Engineering dashboard — xl screens only ── */}
          <motion.div
            className="hidden xl:flex flex-col gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* SYS INFO */}
            <div className="border border-primary/20 bg-background/70 backdrop-blur-sm p-1.5 flex items-center justify-between font-mono text-[9px] text-muted-foreground/50">
              <span>SYS_VER: 2025.R2</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />ONLINE</span>
            </div>

            {/* Active Deployments */}
            <div className="border border-primary/30 bg-background/60 backdrop-blur-sm">
              <div className="border-b border-primary/20 px-4 py-2.5 font-mono text-[10px] text-primary tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2"><Cpu size={10} />ACTIVE_DEPLOYMENTS</span>
                <span className="text-muted-foreground/60">5/5</span>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                {ACTIVE_DEPLOYMENTS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + i * 0.08 }}
                    className="flex items-start justify-between gap-2 font-mono text-[9px] group"
                  >
                    <div>
                      <div className="text-foreground/80 group-hover:text-foreground transition-colors">{p.name}</div>
                      <div className="text-muted-foreground/40 mt-0.5">{p.org}</div>
                    </div>
                    <span className={`${p.color} uppercase font-bold flex-shrink-0 tracking-wider border border-current/20 px-1.5 py-0.5`}>{p.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Metrics 2×2 */}
            <div className="grid grid-cols-2 gap-2">
              {KEY_METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + i * 0.07 }}
                  className="border border-border bg-background/60 backdrop-blur-sm p-3 group hover:border-primary transition-colors"
                >
                  <div className="font-mono text-[8px] text-muted-foreground/50 uppercase tracking-wider mb-1">{m.label}</div>
                  <div className="font-display text-xl text-primary leading-none">{m.value}</div>
                  <div className="font-mono text-[8px] text-muted-foreground/60 mt-1">{m.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Current Objective */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="border border-secondary/30 bg-secondary/5 p-3.5"
            >
              <div className="font-mono text-[9px] text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                <Activity size={9} />
                CURRENT_TARGET
              </div>
              <div className="font-mono text-[10px] text-foreground/80">TAH Shear Stress: {"<"} 10 Pa</div>
              <div className="font-mono text-[9px] text-muted-foreground mt-1 flex items-center justify-between">
                <span>UNSW Bionics Heart</span>
                <span className="text-secondary">ETA: Nov 2026</span>
              </div>
              <div className="mt-2.5 h-1 bg-muted">
                <motion.div
                  className="h-full bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "46%" }}
                  transition={{ delay: 2.7, duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <div className="font-mono text-[8px] text-muted-foreground/40 mt-0.5 flex justify-between">
                <span>19 Pa now</span><span>46% complete</span>
              </div>
            </motion.div>

            {/* System check */}
            <div className="font-mono text-[9px] text-muted-foreground/30 flex items-center justify-between px-1">
              <span>ANSYS_VER: 2025 R2</span>
              <span>SYS_TEMP: 23.4°C <span className="animate-blink">_</span></span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Coordinates decoration — large desktop only */}
      <div className="absolute right-8 bottom-20 z-20 hidden xl:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground/35">
        <span>LAT: -3.3194° S</span>
        <span>LON: 104.1503° E</span>
        <span>BATURAJA, INDONESIA</span>
        <div className="w-[1px] h-16 bg-border mt-2" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-4 sm:left-8 z-20 font-mono flex items-center gap-3 text-xs text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-7 h-7 rounded-full border border-primary flex items-center justify-center">
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            <ArrowDown size={10} className="text-primary" />
          </motion.div>
        </div>
        <span className="hidden sm:block">SCROLL_INIT</span>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-border/30 overflow-hidden py-1.5 bg-background/20 backdrop-blur-sm">
        <motion.div
          className="flex gap-10 sm:gap-16 font-mono text-[9px] sm:text-[10px] text-primary/50 whitespace-nowrap"
          animate={{ x: [0, -800] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="w-1 h-1 bg-primary/40 rounded-full" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
