import { motion } from "framer-motion";
import { Award, CheckCircle2, Cpu, Code2, Wrench } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { DATA } from "@/data/portfolio";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

const SKILL_GROUPS = [
  {
    icon: Wrench,
    title: "CAD & Mechanical Design",
    color: "text-blue-600",
    bg: "bg-blue-50",
    tools: [
      { name: "SolidWorks", note: "CSWA Certified", level: 90 },
      { name: "CATIA V5", note: "Assembly + Flow", level: 70 },
      { name: "Fusion 360", note: "Rapid Prototyping", level: 74 },
      { name: "AutoCAD", note: "2D Technical Drawing", level: 68 },
    ],
  },
  {
    icon: Cpu,
    title: "Simulation & Analysis",
    color: "text-violet-600",
    bg: "bg-violet-50",
    tools: [
      { name: "ANSYS Fluent", note: "CFD / UDF", level: 92 },
      { name: "ANSYS Mechanical", note: "FEA Static + Thermal", level: 90 },
      { name: "ANSYS CFD-Post", note: "Post-processing", level: 85 },
      { name: "ABAQUS", note: "Structural FEA", level: 78 },
      { name: "SolidWorks Simulation", note: "Static + Fatigue", level: 86 },
    ],
  },
  {
    icon: Code2,
    title: "Programming & Data",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    tools: [
      { name: "Python", note: "Data + Scripting", level: 75 },
      { name: "MATLAB", note: "Numerical Analysis", level: 80 },
      { name: "C / C++", note: "UDF + Microcontrollers", level: 65 },
      { name: "Arduino IDE", note: "Hardware / Sensors", level: 70 },
    ],
  },
];

const CERTS = [
  {
    badge: "CSWA",
    title: "SolidWorks Certified Associate",
    desc: "Official certification in 3D mechanical design and simulation — issued by Dassault Systèmes.",
    year: "2024",
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    badge: "SCHOLAR",
    title: "Indonesia Maju Scholarship",
    desc: "Fully funded by Indonesian Ministry of Education — competitive national program for top-performing students.",
    year: "2022–Now",
    color: "border-violet-200 bg-violet-50",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    badge: "INTERN",
    title: "Process Engineering Intern",
    desc: "PT Semen Baturaja Tbk — thermo-structural & CFD analysis in a real industrial environment with live IR sensor data.",
    year: "Dec 2025",
    color: "border-emerald-200 bg-emerald-50",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

function SkillBar({ name, note, level, color }: { name: string; note: string; level: number; color: string }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground ml-2">— {note}</span>
        </div>
        <span className={`text-xs font-mono font-medium ${color}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Page header */}
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label mb-2">Competencies</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">Technical Skills</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Proficiency levels validated through real-world industrial and academic project outcomes across simulation, CAD, and programming.
          </p>
        </motion.div>

        {/* Skill overview tags */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-12">
          {[
            ...DATA.skills.cad,
            ...DATA.skills.simulation,
            ...DATA.skills.programming
          ].map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1.5 tag">
              <CheckCircle2 size={12} />
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                {...fadeUp(gi * 0.1)}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${group.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={20} className={group.color} />
                </div>
                <h2 className="font-semibold text-foreground mb-5">{group.title}</h2>
                <div className="space-y-4">
                  {group.tools.map((tool) => (
                    <SkillBar key={tool.name} {...tool} color={group.color} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Software matrix */}
        <motion.div {...fadeUp(0.15)} className="bg-card border border-border rounded-xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Full Software Suite</h2>
            <span className="text-xs text-muted-foreground font-mono">{SKILL_GROUPS.reduce((a, g) => a + g.tools.length, 0)} tools profiled</span>
          </div>
          <div className="divide-y divide-border">
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} className={group.color} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${group.color}`}>{group.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-1.5 bg-white border border-border rounded-lg px-3 py-1.5 text-xs">
                        <span className="font-medium text-foreground">{tool.name}</span>
                        <span className={`font-mono text-[10px] ${group.color} opacity-70`}>{tool.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div {...fadeUp(0.2)}>
          <div className="flex items-center gap-3 mb-6">
            <Award size={20} className="text-primary" />
            <h2 className="font-semibold text-xl text-foreground">Certifications & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CERTS.map((cert) => (
              <div
                key={cert.badge}
                className={`border rounded-xl p-5 ${cert.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cert.badgeColor}`}>{cert.badge}</span>
                  <span className="text-xs text-muted-foreground font-mono">{cert.year}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{cert.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © 2026 Zaki Fathi Fahrizal
        </div>
      </footer>
    </div>
  );
}
