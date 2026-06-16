import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/data/portfolio";

const SOFTWARE_MATRIX = [
  {
    category: "Simulation & Analysis",
    color: "text-primary",
    bg: "bg-primary",
    border: "border-primary/30",
    tools: [
      { name: "ANSYS Fluent", version: "2025 R2", use: "CFD / UDF", level: 92 },
      { name: "ANSYS Mechanical", version: "2025 R2", use: "FEA Static+Thermal", level: 90 },
      { name: "ANSYS CFD-Post", version: "2025 R2", use: "Post-processing", level: 85 },
      { name: "ABAQUS", version: "CAE", use: "Structural FEA", level: 78 },
      { name: "SolidWorks Sim", version: "2024", use: "Static + Fatigue", level: 86 },
    ]
  },
  {
    category: "CAD & Mechanical Design",
    color: "text-secondary",
    bg: "bg-secondary",
    border: "border-secondary/30",
    tools: [
      { name: "SolidWorks", version: "2024 (CSWA)", use: "3D Modelling", level: 90 },
      { name: "CATIA V5", version: "R21", use: "Assembly + Flow", level: 70 },
      { name: "Fusion 360", version: "Cloud", use: "Rapid Prototype", level: 74 },
      { name: "AutoCAD", version: "2024", use: "2D Technical Draw", level: 68 },
    ]
  },
  {
    category: "Programming & Data",
    color: "text-primary",
    bg: "bg-primary",
    border: "border-primary/30",
    tools: [
      { name: "Python", version: "3.11", use: "Data + Scripting", level: 75 },
      { name: "MATLAB", version: "R2024a", use: "Numerical Analysis", level: 80 },
      { name: "C / C++", version: "GCC 13", use: "UDF + Microctrl", level: 65 },
      { name: "Arduino IDE", version: "2.x", use: "Hardware / Sensors", level: 70 },
    ]
  },
];

export default function Skills() {
  const containerRef = useRef(null);
  const matrixRef = useRef(null);
  const certRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const matrixInView = useInView(matrixRef, { once: true, margin: "-80px" });
  const certInView = useInView(certRef, { once: true, margin: "-60px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const skillPercentages: Record<string, number> = {
    "SolidWorks (CSWA Certified)": 90,
    "Fusion 360": 75,
    "CATIA": 70,
    "CFD": 95,
    "FEM": 90,
    "ANSYS": 92,
    "ABAQUS": 80,
    "SolidWorks Simulation": 88,
    "MATLAB": 80,
    "Python": 75,
    "C+": 65,
    "Arduino": 70
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden bg-background bg-hex-grid">
      {/* Background watermark */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none opacity-[0.012] flex items-center justify-center -translate-y-1/2 select-none">
        <div className="text-[18vw] font-display font-bold whitespace-nowrap leading-none">SYSTEM_SKILLS</div>
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col">
            <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">04 // Database</span>
            Core
            <span className="text-primary">Skills</span>
          </h2>
          <div className="hidden lg:block font-mono text-[10px] text-muted-foreground/40 text-right max-w-xs leading-relaxed">
            <div className="text-primary/60 mb-1">COMPETENCY_MATRIX</div>
            Proficiency levels are empirically validated through
            real-world industrial and academic project outcomes.
          </div>
        </div>

        {/* 3-column skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <SkillCard
            id="SYS.01" title="CAD / Design"
            skills={DATA.skills.cad} percentages={skillPercentages}
            colorClass="text-primary" bgClass="bg-primary"
            borderColorClass="border-primary" variants={cardVariants}
          />
          <SkillCard
            id="SYS.02" title="Simulation"
            skills={DATA.skills.simulation} percentages={skillPercentages}
            colorClass="text-secondary" bgClass="bg-secondary"
            borderColorClass="border-secondary" variants={cardVariants}
          />
          <SkillCard
            id="SYS.03" title="Programming / Data"
            skills={DATA.skills.programming} percentages={skillPercentages}
            colorClass="text-primary" bgClass="bg-primary"
            borderColorClass="border-primary" variants={cardVariants}
          />
        </div>

        {/* ── Software Arsenal Matrix ── */}
        <div ref={matrixRef} className="mt-10 md:mt-14 border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 md:px-8 py-4">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary flex-shrink-0" />
              <span>
                <span className="text-muted-foreground/50 text-xs font-mono block mb-0.5 tracking-widest">SYS.04 // Arsenal</span>
                Engineering Software Suite
              </span>
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground/40 hidden sm:block uppercase tracking-widest">
              {SOFTWARE_MATRIX.reduce((a, b) => a + b.tools.length, 0)} tools profiled
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {SOFTWARE_MATRIX.map((category, ci) => (
              <div key={category.category} className="p-5 md:p-6">
                <div className={`font-mono text-[10px] uppercase tracking-widest ${category.color} mb-5 flex items-center gap-2`}>
                  <div className={`w-1.5 h-1.5 ${category.bg}`} />
                  {category.category}
                </div>
                <div className="space-y-4">
                  {category.tools.map((tool, ti) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={matrixInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: ci * 0.1 + ti * 0.06, duration: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-foreground/80 group-hover:text-foreground transition-colors">{tool.name}</span>
                          <span className="font-mono text-[9px] text-muted-foreground/40 border border-border/40 px-1">{tool.version}</span>
                        </div>
                        <span className={`font-mono text-[9px] ${category.color} opacity-60`}>{tool.level}%</span>
                      </div>
                      <div className="font-mono text-[9px] text-muted-foreground/40 mb-1.5">{tool.use}</div>
                      <div className="h-[2px] w-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={matrixInView ? { width: `${tool.level}%` } : {}}
                          transition={{ delay: ci * 0.1 + ti * 0.06 + 0.2, duration: 1, ease: "easeOut" }}
                          className={`h-full ${category.bg} opacity-60 group-hover:opacity-100 transition-opacity`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications & Recognition ── */}
        <motion.div ref={certRef} variants={cardVariants} className="mt-10 md:mt-12 border border-border bg-card p-6 md:p-10 relative">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

          <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-6 md:mb-8">
            <span className="text-muted-foreground/50 text-xs font-mono block mb-1.5 tracking-widest">SYS.05 // Recognition</span>
            Certifications & Awards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                badge: "CSWA",
                title: "SolidWorks Certified Associate",
                body: "Official certification in 3D mechanical design and simulation — issued by Dassault Systèmes",
                color: "border-primary/40 bg-primary/5",
                textColor: "text-primary",
                year: "2024"
              },
              {
                badge: "SCHOLAR",
                title: "Indonesia Maju Scholarship",
                body: "Fully funded by Indonesian Ministry of Education — competitive national program for top-performing students",
                color: "border-secondary/40 bg-secondary/5",
                textColor: "text-secondary",
                year: "2022–Now"
              },
              {
                badge: "INTERN",
                title: "PT Semen Baturaja Tbk",
                body: "Process Engineering Intern — thermo-structural & CFD analysis in real industrial environment with live sensor data",
                color: "border-primary/40 bg-primary/5",
                textColor: "text-primary",
                year: "2024"
              },
            ].map((cert) => (
              <motion.div
                key={cert.badge}
                initial={{ opacity: 0, y: 20 }}
                animate={certInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={`border ${cert.color} p-4 md:p-5 relative group hover:border-opacity-80 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`font-mono text-[10px] ${cert.textColor} border border-current px-2 py-0.5 uppercase tracking-widest`}>
                    {cert.badge}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/40">{cert.year}</span>
                </div>
                <h4 className="font-display text-base md:text-lg uppercase mb-2">{cert.title}</h4>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">{cert.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SkillCard({ id, title, skills, percentages, colorClass, bgClass, borderColorClass, variants }: any) {
  return (
    <motion.div variants={variants} className="border border-border bg-card p-6 md:p-8 relative group hover:border-muted-foreground transition-colors duration-300">
      <div className="absolute top-0 right-0 bg-muted px-3 py-1.5 font-mono text-[10px] text-muted-foreground tracking-widest border-b border-l border-border group-hover:text-foreground transition-colors">
        {id}
      </div>

      <h3 className="text-xl md:text-2xl font-display tracking-wide uppercase mb-6 text-foreground border-b border-border pb-4 flex items-center gap-3">
        <div className={`w-2 h-2 ${bgClass} flex-shrink-0`} />
        {title}
      </h3>

      <ul className="space-y-5 font-mono text-sm">
        {skills.map((skill: string, index: number) => {
          const percent = percentages[skill] || 80;
          return (
            <li key={skill} className="relative">
              <div className="flex justify-between items-center mb-1.5 z-10 relative">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors text-xs">{skill}</span>
                <span className={`${colorClass} opacity-70 text-xs`}>{percent}%</span>
              </div>
              <div className="h-[2px] w-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  transition={{ duration: 1.5, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`h-full ${bgClass} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColorClass} opacity-0 group-hover:opacity-100 transition-opacity translate-x-[2px] translate-y-[2px]`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColorClass} opacity-0 group-hover:opacity-100 transition-opacity -translate-x-[2px] translate-y-[2px]`} />
    </motion.div>
  );
}
