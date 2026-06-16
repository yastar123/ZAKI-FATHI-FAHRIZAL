import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/data/portfolio";

export default function Skills() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
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
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight flex flex-col mb-16 md:mb-24">
          <span className="text-muted-foreground/50 text-sm font-mono mb-4 tracking-widest">04 // Database</span>
          Core
          <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <SkillCard
            id="SYS.01"
            title="CAD / Design"
            skills={DATA.skills.cad}
            percentages={skillPercentages}
            colorClass="text-primary"
            bgClass="bg-primary"
            borderColorClass="border-primary"
            variants={cardVariants}
          />
          <SkillCard
            id="SYS.02"
            title="Simulation"
            skills={DATA.skills.simulation}
            percentages={skillPercentages}
            colorClass="text-secondary"
            bgClass="bg-secondary"
            borderColorClass="border-secondary"
            variants={cardVariants}
          />
          <SkillCard
            id="SYS.03"
            title="Programming / Data"
            skills={DATA.skills.programming}
            percentages={skillPercentages}
            colorClass="text-primary"
            bgClass="bg-primary"
            borderColorClass="border-primary"
            variants={cardVariants}
          />
        </div>

        {/* Certifications & Recognition */}
        <motion.div
          variants={cardVariants}
          className="mt-10 md:mt-14 border border-border bg-card p-6 md:p-10 relative"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />

          <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-6 md:mb-8">
            <span className="text-muted-foreground/50 text-sm font-mono block mb-2 tracking-widest">SYS.04 // Recognition</span>
            Certifications & Awards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                badge: "CSWA",
                title: "SolidWorks Certified Associate",
                body: "Official certification in 3D mechanical design and simulation",
                color: "border-primary/40 bg-primary/5",
                textColor: "text-primary"
              },
              {
                badge: "SCHOLAR",
                title: "Indonesia Maju Scholarship",
                body: "Fully funded by Indonesian Ministry of Education — competitive national program",
                color: "border-secondary/40 bg-secondary/5",
                textColor: "text-secondary"
              },
              {
                badge: "INTERN",
                title: "PT Semen Baturaja Tbk",
                body: "Process Engineering Intern — thermo-structural & CFD analysis in real industrial environment",
                color: "border-primary/40 bg-primary/5",
                textColor: "text-primary"
              },
            ].map((cert) => (
              <div key={cert.badge} className={`border ${cert.color} p-4 md:p-5 relative`}>
                <span className={`font-mono text-[10px] ${cert.textColor} border border-current px-2 py-0.5 mb-3 inline-block uppercase tracking-widest`}>
                  {cert.badge}
                </span>
                <h4 className="font-display text-base md:text-lg uppercase mb-2">{cert.title}</h4>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">{cert.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none opacity-[0.015] flex items-center justify-center -translate-y-1/2">
        <div className="text-[20vw] md:text-[25vw] font-display font-bold whitespace-nowrap leading-none">
          SYSTEM_SKILLS
        </div>
      </div>
    </section>
  );
}

function SkillCard({ id, title, skills, percentages, colorClass, bgClass, borderColorClass, variants }: any) {
  return (
    <motion.div variants={variants} className="border border-border bg-card p-6 md:p-10 relative group hover:border-muted-foreground transition-colors duration-300">
      <div className="absolute top-0 right-0 bg-muted px-3 py-1.5 font-mono text-[10px] text-muted-foreground tracking-widest border-b border-l border-border group-hover:text-foreground transition-colors">
        {id}
      </div>

      <h3 className={`text-xl md:text-2xl font-display tracking-wide uppercase mb-6 md:mb-8 text-foreground border-b border-border pb-4 md:pb-6 flex items-center gap-3`}>
        <div className={`w-2 h-2 ${bgClass} flex-shrink-0`} />
        {title}
      </h3>

      <ul className="space-y-5 md:space-y-6 font-mono text-sm">
        {skills.map((skill: string, index: number) => {
          const percent = percentages[skill] || 80;
          return (
            <li key={skill} className="relative">
              <div className="flex justify-between items-center mb-1.5 z-10 relative">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors text-xs md:text-sm">{skill}</span>
                <span className={`${colorClass} opacity-70 text-xs`}>{percent}%</span>
              </div>
              <div className="h-[3px] w-full bg-muted">
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
