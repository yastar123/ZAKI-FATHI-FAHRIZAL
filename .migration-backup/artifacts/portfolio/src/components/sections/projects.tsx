import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { Cpu, LayoutTemplate, Activity, Settings2, ShieldCheck, ChevronLeft, ChevronRight, X, Thermometer, Zap, Target, BookOpen, Lightbulb, Building2, Waves, Anchor, Navigation } from "lucide-react";
import { PROJECT_01_IMAGES, PROJECT_02_IMAGES, PROJECT_04_IMAGES, PROJECT_05_IMAGES, type ProjectImage } from "@/data/project-images";

const ICONS = [Cpu, Thermometer, Activity, Anchor, Settings2, ShieldCheck];

function ProjectImageGallery({ images }: { images: ProjectImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight" && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const heroImage = images[0];
  const gridImages = images.slice(1);

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center gap-4 mb-6">
        <h4 className="font-mono text-sm tracking-widest text-primary uppercase">VISUAL_EVIDENCE //</h4>
        <div className="h-[1px] flex-grow bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-1/4 bg-primary"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{images.length} FRAMES</span>
      </div>

      <div
        className="w-full aspect-video relative overflow-hidden group cursor-pointer mb-4"
        onClick={() => setSelectedIndex(0)}
      >
        <img
          src={heroImage.src}
          alt={heroImage.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/60 transition-colors duration-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 font-mono text-sm text-white">
          <span className="bg-primary text-primary-foreground px-2 py-0.5 text-[10px] mr-2 font-bold uppercase">{heroImage.type}</span>
          <span className="text-white/90 text-xs">{heroImage.caption}</span>
        </div>
        <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-sm border border-border px-2 py-1 font-mono text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          CLICK TO EXPAND
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {gridImages.map((img, idx) => {
          const actualIndex = idx + 1;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="relative aspect-square group overflow-hidden cursor-pointer bg-muted border border-border hover:border-primary transition-colors duration-300"
              onClick={() => setSelectedIndex(actualIndex)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground font-mono text-[9px] px-1.5 py-0.5 uppercase z-10">
                {img.type}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <p className="text-white font-mono text-[9px] line-clamp-2 leading-tight">{img.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/97 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10 border border-white/20 p-2 hover:border-primary hover:text-primary"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            >
              <X size={20} />
            </button>

            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors z-10 border border-white/10 p-3 hover:border-primary"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
              }}
            >
              <ChevronLeft size={28} />
            </button>

            <div
              className="relative max-w-[88vw] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].caption}
                className="max-h-[78vh] max-w-full object-contain"
              />
              <div className="mt-4 text-center font-mono text-sm text-white/70 px-4">
                <span className="text-primary mr-3">[{selectedIndex + 1}/{images.length}]</span>
                <span className="text-xs uppercase bg-primary/20 px-2 py-0.5 mr-2">{images[selectedIndex].type}</span>
                {images[selectedIndex].caption}
              </div>
            </div>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors z-10 border border-white/10 p-3 hover:border-primary"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! + 1) % images.length);
              }}
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[80vw] overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`w-10 h-10 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    i === selectedIndex ? "border-primary" : "border-white/20 hover:border-white/50"
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RichDetailSection({ project, accentColor = "primary" }: { project: any; accentColor?: "primary" | "secondary" }) {
  const [activeTab, setActiveTab] = useState<"overview" | "method" | "results" | "impact">("overview");

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: Target },
    { id: "method", label: "METHOD", icon: Settings2 },
    { id: "results", label: "RESULTS", icon: Zap },
    { id: "impact", label: "IMPACT", icon: Lightbulb },
  ] as const;

  const accent = accentColor === "secondary" ? "text-secondary border-secondary bg-secondary/5" : "text-primary border-primary bg-primary/5";
  const accentBorder = accentColor === "secondary" ? "border-secondary/30 bg-secondary/5" : "border-primary/20 bg-primary/5";
  const accentText = accentColor === "secondary" ? "text-secondary" : "text-primary";
  const accentBg = accentColor === "secondary" ? "bg-secondary" : "bg-primary";

  return (
    <div className="lg:col-span-7 flex flex-col gap-8">
      <div className="tabs-scroll border-b border-border">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? `${accentText} ${accentColor === "secondary" ? "bg-secondary/5" : "bg-primary/5"}`
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={11} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId={`tab-indicator-${project.id}`}
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${accentBg}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-background/50 border border-border p-6 relative">
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/50 translate-x-[1px] -translate-y-[1px]" />
              <h4 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-3 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 ${accentBg} inline-block`} /> Background
              </h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{project.background}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="pl-4 border-l-2 border-destructive/50 py-1">
                <h4 className="font-mono text-xs tracking-widest text-destructive/70 uppercase mb-2">Problem</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div className={`pl-4 border-l-2 ${accentColor === "secondary" ? "border-secondary/50" : "border-primary/50"} py-1`}>
                <h4 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-2`}>Solution</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Project-specific spec grid */}
            {project.id === "04" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Thrusters", value: "6×" },
                  { label: "Max Depth", value: "5 m" },
                  { label: "Drag (Cd)", value: "0.91–0.97" },
                  { label: "Competition", value: "SAUVC 26" },
                  { label: "Manufacture", value: "3D Print" },
                  { label: "Location", value: "Sanya, CN" },
                ].map((spec) => (
                  <div key={spec.label} className="border border-border bg-card p-3 text-center group hover:border-primary transition-colors">
                    <div className={`text-xl font-display font-bold ${accentText} group-hover:text-foreground transition-colors`}>{spec.value}</div>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>
            )}

            {project.id === "05" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Max Stress", value: "6.56 MPa" },
                  { label: "Al 6061 Limit", value: "95 MPa" },
                  { label: "User Weight", value: "80 kg" },
                  { label: "Traction", value: "20% BW" },
                ].map((spec) => (
                  <div key={spec.label} className="border border-border bg-card p-3 text-center group hover:border-secondary transition-colors">
                    <div className={`text-lg font-display font-bold ${accentText} group-hover:text-foreground transition-colors`}>{spec.value}</div>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "method" && (
          <motion.div
            key="method"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-background/50 border border-border p-6">
              <h4 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-4`}>Workflow Pipeline</h4>
              <div className="space-y-3">
                {project.methodSteps.map((step: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className={`flex-shrink-0 w-7 h-7 border ${accentColor === "secondary" ? "border-secondary/40" : "border-primary/40"} flex items-center justify-center font-mono text-[10px] ${accentText} group-hover:${accentBg} group-hover:text-primary-foreground transition-all`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-1 text-sm text-foreground/80 leading-relaxed border-b border-border/50 pb-3 flex-grow">{step}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project 04: component list */}
            {project.id === "04" && project.components && (
              <div>
                <h4 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-3`}>Designed Components</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.components.map((comp: any, i: number) => (
                    <motion.div
                      key={comp.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="border border-border p-3 group hover:border-primary transition-colors"
                    >
                      <div className={`font-mono text-xs font-bold ${accentText} uppercase mb-1`}>{comp.name}</div>
                      <div className="text-xs text-muted-foreground">{comp.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Project 05: BC table */}
            {project.id === "05" && (
              <div>
                <h4 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-3`}>Boundary Conditions</h4>
                <div className="border border-border overflow-hidden">
                  {[
                    { bc: "Applied Torque", value: "30 Nm", note: "Gearing mechanism load" },
                    { bc: "User Body Weight", value: "80 kg", note: "Compressive joint force" },
                    { bc: "Traction Force", value: "20% BW", note: "16 kg active traction" },
                    { bc: "Hinge Constraint", value: "Fixed", note: "Rotational pivot locked" },
                    { bc: "Material", value: "Al 6061-T6", note: "Yield: 276 MPa, Fatigue: 95 MPa" },
                  ].map((row, i) => (
                    <div key={row.bc} className={`grid grid-cols-3 gap-4 px-4 py-2.5 font-mono text-xs ${i % 2 === 0 ? "bg-muted/30" : "bg-background"} border-b border-border/50 last:border-0`}>
                      <span className="text-muted-foreground">{row.bc}</span>
                      <span className={`font-bold ${accentText}`}>{row.value}</span>
                      <span className="text-muted-foreground/60 text-[10px] pt-0.5">{row.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {project.results.map((result: any, i: number) => (
              <motion.div
                key={result.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`border border-border bg-card p-6 relative group hover:border-${accentColor === "secondary" ? "secondary" : "primary"} transition-colors duration-300`}
              >
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-${accentColor === "secondary" ? "secondary" : "primary"} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                <div className="flex items-start gap-4">
                  <div className={`text-4xl font-display ${accentText}/20 font-bold leading-none flex-shrink-0 group-hover:${accentText}/40 transition-colors`}>
                    {result.number}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-mono text-xs tracking-widest ${accentText} uppercase`}>{result.title}</h5>
                      <span className={`font-mono text-xs text-secondary border border-secondary/30 px-2 py-0.5`}>{result.metric}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{result.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "impact" && (
          <motion.div
            key="impact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className={`border ${accentBorder} p-6 relative`}>
              <div className={`absolute top-2 right-2 font-mono text-[10px] ${accentText}/30 uppercase tracking-widest`}>Conclusion</div>
              <BookOpen size={20} className={`${accentText} mb-3`} />
              <p className="text-sm text-foreground/80 leading-relaxed">{project.conclusion}</p>
            </div>

            <div className="border border-border p-6 relative">
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-xs tracking-widest text-secondary uppercase mb-2">Real-World Impact</h5>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.benefits}</p>
                </div>
              </div>
            </div>

            <div className="border border-border p-6 relative">
              <div className="flex items-start gap-3">
                <Lightbulb size={16} className={`${accentText} flex-shrink-0 mt-0.5`} />
                <div>
                  <h5 className={`font-mono text-xs tracking-widest ${accentText} uppercase mb-2`}>Key Learnings</h5>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.learnings}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Project02DetailSection({ project }: { project: any }) {
  const [activeTab, setActiveTab] = useState<"overview" | "method" | "results" | "conclusion">("overview");

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: Target },
    { id: "method", label: "METHOD", icon: Settings2 },
    { id: "results", label: "RESULTS", icon: Zap },
    { id: "conclusion", label: "IMPACT", icon: Lightbulb },
  ] as const;

  return (
    <div className="lg:col-span-7 flex flex-col gap-8">
      <div className="tabs-scroll border-b border-border">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={11} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-background/50 border border-border p-6 relative">
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/50 translate-x-[1px] -translate-y-[1px]" />
              <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary inline-block" /> Background
              </h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{project.background}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="pl-4 border-l-2 border-destructive/50 py-1">
                <h4 className="font-mono text-xs tracking-widest text-destructive/70 uppercase mb-2">Problem</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div className="pl-4 border-l-2 border-primary/50 py-1">
                <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-2">Solution</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Kiln Length", value: "72 m" },
                { label: "Kiln Diameter", value: "4.556 m" },
                { label: "Gas Temperature", value: "1450°C" },
                { label: "Rotation Speed", value: "3.40 RPM" },
              ].map((spec) => (
                <div key={spec.label} className="border border-border bg-card p-3 text-center group hover:border-primary transition-colors">
                  <div className="text-xl font-display font-bold text-primary group-hover:text-foreground transition-colors">{spec.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase mt-1">{spec.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "method" && (
          <motion.div
            key="method"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-background/50 border border-border p-6">
              <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-4">Workflow Pipeline</h4>
              <div className="space-y-3">
                {project.methodSteps.map((step: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex-shrink-0 w-7 h-7 border border-primary/40 flex items-center justify-center font-mono text-[10px] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-1 text-sm text-foreground/80 leading-relaxed border-b border-border/50 pb-3 flex-grow">{step}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-3">Kiln Zone Division</h4>
              <div className="grid grid-cols-4 gap-1 font-mono text-[10px]">
                {[
                  { name: "INLET", temp: "~240°C", color: "bg-blue-500/20 border-blue-500/40", textColor: "text-blue-400" },
                  { name: "BURNING", temp: "~850°C", color: "bg-orange-500/20 border-orange-500/40", textColor: "text-orange-400" },
                  { name: "COOLING", temp: "~400°C", color: "bg-yellow-500/20 border-yellow-500/40", textColor: "text-yellow-400" },
                  { name: "OUTLET", temp: "~240°C", color: "bg-green-500/20 border-green-500/40", textColor: "text-green-400" },
                ].map((zone) => (
                  <div key={zone.name} className={`border ${zone.color} p-3 text-center`}>
                    <div className={`font-bold ${zone.textColor} mb-1`}>{zone.name}</div>
                    <div className="text-muted-foreground">{zone.temp}</div>
                  </div>
                ))}
              </div>
              <div className="flex mt-1">
                <div className="flex-grow h-1.5 bg-gradient-to-r from-blue-500/60 via-orange-500/80 via-yellow-500/60 to-green-500/60" />
              </div>
              <div className="text-right font-mono text-[10px] text-muted-foreground mt-1">72m total length →</div>
            </div>
          </motion.div>
        )}

        {activeTab === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {project.results.map((result: any, i: number) => (
              <motion.div
                key={result.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-border bg-card p-6 relative group hover:border-primary transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-display text-primary/20 font-bold leading-none flex-shrink-0 group-hover:text-primary/40 transition-colors">
                    {result.number}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-xs tracking-widest text-primary uppercase">{result.title}</h5>
                      <span className="font-mono text-xs text-secondary border border-secondary/30 px-2 py-0.5">{result.metric}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{result.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "conclusion" && (
          <motion.div
            key="conclusion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="border border-primary/20 bg-primary/5 p-6 relative">
              <div className="absolute top-2 right-2 font-mono text-[10px] text-primary/30 uppercase tracking-widest">Conclusion</div>
              <BookOpen size={20} className="text-primary mb-3" />
              <p className="text-sm text-foreground/80 leading-relaxed">{project.conclusion}</p>
            </div>

            <div className="border border-border p-6 relative">
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-xs tracking-widest text-secondary uppercase mb-2">Business Impact</h5>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.benefits}</p>
                </div>
              </div>
            </div>

            <div className="border border-border p-6 relative">
              <div className="flex items-start gap-3">
                <Lightbulb size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-mono text-xs tracking-widest text-primary uppercase mb-2">Key Learnings</h5>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.learnings}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 mb-20 md:mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col"
        >
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">02 // Showcase</span>
          Technical
          <span className="text-primary">Projects</span>
        </motion.h2>
      </div>

      <div className="flex flex-col w-full">
        {DATA.projects.map((project, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              Icon={Icon}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, Icon }: { project: any; index: number; Icon: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const galleryImages =
    project.id === "01" ? PROJECT_01_IMAGES :
    project.id === "02" ? PROJECT_02_IMAGES :
    project.id === "04" ? PROJECT_04_IMAGES :
    project.id === "05" ? PROJECT_05_IMAGES :
    null;

  const isRichLayout = project.id === "02" || project.id === "04" || project.id === "05";

  return (
    <article
      ref={cardRef}
      className="group relative border-t border-border py-16 md:py-24 hover:bg-card transition-colors duration-700 overflow-hidden w-full"
    >
      <motion.div
        style={{ y }}
        className="absolute right-[-5%] top-1/4 text-[22vw] font-display font-bold text-muted/8 pointer-events-none select-none -z-10 group-hover:text-primary/8 transition-colors duration-700 leading-none"
      >
        {project.id}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 sm:px-6 z-10 relative"
      >
        {/* Project 02 — full thermo-structural tabbed layout */}
        {project.id === "02" && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-5/12 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-primary">
                  <Icon size={28} strokeWidth={1.5} />
                  <div className="h-[1px] flex-grow bg-border" />
                  <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold uppercase leading-[1.15] mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm font-mono text-muted-foreground border-l-2 border-primary/50 pl-4 py-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Role</span>
                      <span className="text-foreground text-xs">{project.role}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Date</span>
                      <span className="text-foreground text-xs">{project.date}</span>
                    </div>
                    <div className="flex flex-col col-span-2 mt-1">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Organization</span>
                      <span className="text-primary text-xs">{project.company}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tools.map((tool: string) => (
                    <span key={tool} className="text-[10px] font-mono border border-border px-2 py-1 bg-background text-muted-foreground group-hover:border-primary/30 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <Project02DetailSection project={project} />
            </div>
            {galleryImages && <ProjectImageGallery images={galleryImages} />}
          </div>
        )}

        {/* Projects 04 & 05 — rich tabbed layout */}
        {(project.id === "04" || project.id === "05") && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-5/12 flex flex-col gap-6">
                <div className={`flex items-center gap-4 ${project.id === "05" ? "text-secondary" : "text-primary"}`}>
                  <Icon size={28} strokeWidth={1.5} />
                  <div className="h-[1px] flex-grow bg-border" />
                  <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
                </div>
                <div>
                  <h3 className={`text-2xl md:text-3xl font-display font-bold uppercase leading-[1.15] mb-4 ${project.id === "05" ? "group-hover:text-secondary" : "group-hover:text-primary"} transition-colors`}>
                    {project.title}
                  </h3>
                  <div className={`grid grid-cols-2 gap-3 text-sm font-mono text-muted-foreground border-l-2 ${project.id === "05" ? "border-secondary/50" : "border-primary/50"} pl-4 py-2`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Role</span>
                      <span className="text-foreground text-xs">{project.role}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Date</span>
                      <span className="text-foreground text-xs">{project.date}</span>
                    </div>
                    <div className="flex flex-col col-span-2 mt-1">
                      <span className="text-[10px] text-muted-foreground/50 uppercase">Organization</span>
                      <span className={`${project.id === "05" ? "text-secondary" : "text-primary"} text-xs`}>{project.company}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 pl-4 border-l border-border">
                    {project.what}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tools.map((tool: string) => (
                    <span key={tool} className={`text-[10px] font-mono border border-border px-2 py-1 bg-background text-muted-foreground ${project.id === "05" ? "group-hover:border-secondary/30" : "group-hover:border-primary/30"} transition-colors`}>
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Project 04 status badge */}
                {project.id === "04" && (
                  <div className="border border-primary/30 bg-primary/5 p-3 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Active Development</span>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground">Targeting SAUVC 2026 — Sanya, China. Enrolling VIP ENGG4600.</p>
                  </div>
                )}

                {/* Project 05 result badges */}
                {project.id === "05" && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[
                      { val: ">13", label: "FoS" },
                      { val: "1M+", label: "Cycles" },
                      { val: "Safe", label: "Status" },
                    ].map((badge) => (
                      <div key={badge.label} className="border border-secondary/30 bg-secondary/5 p-2 text-center">
                        <div className="text-lg font-display font-bold text-secondary">{badge.val}</div>
                        <div className="font-mono text-[9px] text-muted-foreground uppercase">{badge.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <RichDetailSection
                project={project}
                accentColor={project.id === "05" ? "secondary" : "primary"}
              />
            </div>

            {galleryImages && <ProjectImageGallery images={galleryImages} />}
          </div>
        )}

        {/* Standard layout for projects 01 and 03 */}
        {!isRichLayout && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-4 text-primary">
                <Icon size={28} strokeWidth={1.5} />
                <div className="h-[1px] flex-grow bg-border" />
                <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
              </div>

              <div>
                <h3 className="text-2xl md:text-4xl font-display font-bold uppercase leading-[1.1] mb-4 md:mb-6 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm font-mono text-muted-foreground border-l-2 border-primary/50 pl-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground/50">ROLE</span>
                    <span className="text-foreground text-sm">{project.role}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground/50">DATE</span>
                    <span className="text-foreground text-sm">{project.date}</span>
                  </div>
                  <div className="flex flex-col col-span-2 mt-2">
                    <span className="text-xs text-muted-foreground/50">ORGANIZATION</span>
                    <span className="text-primary">{project.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tools.map((tool: string) => (
                  <span key={tool} className="text-xs font-mono border border-border px-3 py-1.5 bg-background text-muted-foreground group-hover:border-primary/30 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-8 text-sm md:text-base font-light">
              <div className="bg-background/50 border border-border p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/50 translate-x-[1px] -translate-y-[1px]" />
                <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary inline-block" /> Mission Objective
                </h4>
                <p className="text-foreground leading-relaxed">{project.what}</p>
              </div>

              {project.problem && (
                <div className="pl-5 md:pl-6 border-l border-border relative">
                  <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-secondary" />
                  <h4 className="font-mono text-xs tracking-widest text-secondary uppercase mb-2 md:mb-3">Problem Statement</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{project.problem}</p>
                </div>
              )}

              <div className="pl-5 md:pl-6 border-l border-border relative">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-mono text-xs tracking-widest text-primary uppercase mb-2 md:mb-3">Methodology</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{project.method}</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 md:p-8 relative overflow-hidden group-hover:bg-primary/10 transition-colors">
                <h4 className="font-mono text-xs tracking-widest text-foreground uppercase mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-foreground inline-block" /> Key Results
                </h4>
                <p className="text-foreground font-medium leading-relaxed text-sm">{project.result}</p>
              </div>

              {galleryImages && <ProjectImageGallery images={galleryImages} />}
            </div>
          </div>
        )}
      </motion.div>
    </article>
  );
}
