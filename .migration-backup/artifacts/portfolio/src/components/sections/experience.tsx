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

// Rich metadata per experience — fills the opposite-side empty space on desktop
const EXP_META: Record<string, {
  type: string;
  location: string;
  impact: string;
  impactSub: string;
  tools: string[];
  highlight: string;
  status: "ACTIVE" | "COMPLETED";
}> = {
  "exp-1": {
    type: "Industrial Internship",
    location: "Baturaja, South Sumatra, ID",
    impact: "72m",
    impactSub: "Rotary Kiln FEA Model",
    tools: ["ANSYS Fluent", "ANSYS FEA", "SolidWorks", "CATIA", "Infrared Sensing"],
    highlight: "First engineer at PT SB to apply ANSYS thermo-structural coupled simulation to the rotary kiln with real IR boundary conditions.",
    status: "COMPLETED",
  },
  "exp-2": {
    type: "Research Engineering",
    location: "UNSW Sydney, Kensington NSW",
    impact: "19 → <10",
    impactSub: "Shear stress Pa reduction",
    tools: ["ANSYS Fluent", "C / UDF", "CAD Modeling", "CFD Analysis"],
    highlight: "Developing UDF code in C to simulate nutation motion of the Total Artificial Heart — a world-first at UNSW.",
    status: "ACTIVE",
  },
  "exp-3": {
    type: "Student Engineering Team",
    location: "UNSW Sydney, Kensington NSW",
    impact: "Cd 0.97",
    impactSub: "AUV Drag at 1 m/s",
    tools: ["SolidWorks CAD", "ANSYS FEA", "ANSYS CFD", "3D Printing", "Laser Cutting"],
    highlight: "Led hull and thruster bracket design for SAUVC 2026. Pressure hull validated to 5m depth via FEA.",
    status: "ACTIVE",
  },
  "exp-4": {
    type: "Media & Outreach",
    location: "Sydney, NSW, Australia",
    impact: "3k+",
    impactSub: "Reach per campaign",
    tools: ["Adobe Photoshop", "Content Strategy", "Copywriting", "Social Media"],
    highlight: "Managed digital communications bridging Indonesian student community across multiple universities in NSW.",
    status: "COMPLETED",
  },
};

export default function Experience() {
  const containerRef = useRef(null);

  return (
    <section id="experience" ref={containerRef} className="py-20 md:py-32 relative bg-card border-y border-border overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col"
          >
            <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">03 // Timeline</span>
            Work
            <span className="text-primary">Experience</span>
          </motion.h2>

          {/* Desktop timeline legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex flex-col gap-2 font-mono text-[10px] text-muted-foreground/40"
          >
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />ACTIVE — Currently ongoing</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" />COMPLETED — Archived</div>
            <div className="flex items-center gap-2"><span className="w-1 h-[1px] bg-primary/40 inline-block" />Timeline: 2022–2026</div>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main timeline line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2" />

          <div className="flex flex-col gap-14 md:gap-24">
            {DATA.experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              const meta = EXP_META[exp.id] || EXP_META["exp-4"];
              return (
                <TimelineItem key={exp.id} exp={exp} meta={meta} isEven={isEven} index={index} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, meta, isEven, index }: {
  exp: any;
  meta: typeof EXP_META[string];
  isEven: boolean;
  index: number;
}) {
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

  const statusColor = meta.status === "ACTIVE" ? "text-primary border-primary/30 bg-primary/5" : "text-muted-foreground/50 border-border bg-muted/20";

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""} gap-0 md:gap-0 items-start`}
    >
      {/* Timeline Dot */}
      <motion.div
        style={{ scale }}
        className="absolute left-[18px] md:left-1/2 w-9 h-9 md:w-10 md:h-10 bg-background border-2 border-primary flex items-center justify-center -translate-x-1/2 mt-2 z-10 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
      >
        <div className={`w-2.5 h-2.5 md:w-3 md:h-3 ${meta.status === "ACTIVE" ? "bg-primary animate-pulse" : "bg-muted-foreground/40"}`} />
      </motion.div>

      {/* Connector Line */}
      <div
        className={`absolute top-6 h-[1px] bg-primary/20 hidden md:block w-[calc(50%-22px)] ${
          isEven ? "right-1/2" : "left-1/2"
        }`}
      />

      {/* ── Content Card ── */}
      <motion.div
        style={{ opacity, x }}
        className={`w-full md:w-[calc(50%-24px)] pl-12 sm:pl-14 md:pl-0 ${
          isEven ? "md:pl-10 md:pr-0 md:ml-auto" : "md:pr-10 md:pl-0"
        }`}
      >
        <div className="border border-border bg-background p-5 sm:p-6 md:p-7 hover:border-primary transition-all duration-500 relative group shadow-xl">
          {/* Engineering corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

          {/* Card ID + status */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground border border-border">
              EXP_{String(index + 1).padStart(2, "0")}
            </span>
            <span className={`font-mono text-[9px] border px-2 py-0.5 uppercase tracking-wider ${statusColor}`}>
              {meta.status}
            </span>
          </div>

          <div className="text-xs font-mono text-primary mb-2 tracking-widest">{exp.date}</div>
          <h3 className="text-xl sm:text-2xl font-display tracking-wide uppercase mb-1.5 group-hover:text-primary transition-colors leading-tight">
            {exp.title}
          </h3>
          <div className="text-xs sm:text-sm font-mono text-muted-foreground mb-1 uppercase">{exp.company}</div>
          <div className="font-mono text-[10px] text-muted-foreground/40 mb-5 pb-4 border-b border-border">
            {meta.location} · {meta.type}
          </div>

          <ul className="space-y-3">
            {exp.points.map((point: string, i: number) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-3">
                <span className="text-primary font-mono mt-0.5 flex-shrink-0">{">"}</span>
                <span className="leading-relaxed font-light">{point}</span>
              </li>
            ))}
          </ul>

          {/* Tool tags */}
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5">
            {meta.tools.map((tool) => (
              <span key={tool} className="font-mono text-[9px] border border-border/50 px-2 py-0.5 text-muted-foreground/50 uppercase tracking-wide group-hover:border-primary/30 group-hover:text-muted-foreground transition-all">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Opposite-side Callout (desktop only) ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className={`hidden md:flex w-[calc(50%-24px)] flex-col justify-center gap-4 ${
          isEven ? "md:pr-10 md:pl-0" : "md:pl-10 md:pr-0 md:ml-auto"
        }`}
      >
        {/* Key metric */}
        <div className="border border-primary/20 bg-primary/5 p-5">
          <div className="font-mono text-[9px] text-primary/60 uppercase tracking-widest mb-2">Key Metric</div>
          <div className="font-display text-4xl lg:text-5xl text-primary leading-none">{meta.impact}</div>
          <div className="font-mono text-[10px] text-muted-foreground/60 mt-1">{meta.impactSub}</div>
        </div>

        {/* Highlight insight */}
        <div className="border border-border bg-card p-5 relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-border/50 -translate-y-[0.5px] translate-x-[0.5px]" />
          <div className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest mb-2">Highlight</div>
          <p className="text-xs text-muted-foreground font-light leading-relaxed italic">"{meta.highlight}"</p>
        </div>
      </motion.div>
    </div>
  );
}
