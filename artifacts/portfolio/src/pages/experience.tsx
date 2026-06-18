import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Zap, CheckCircle2 } from "lucide-react";
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

const EXP_META: Record<string, {
  location: string;
  type: string;
  status: "Active" | "Completed";
  impact: string;
  impactLabel: string;
  tools: string[];
  highlight: string;
  color: string;
  bg: string;
  border: string;
}> = {
  EXP_01: {
    location: "Baturaja, South Sumatra, Indonesia",
    type: "Industrial Internship",
    status: "Completed",
    impact: "72 m",
    impactLabel: "Rotary kiln FEA model",
    tools: ["ANSYS Fluent", "ANSYS FEA", "SolidWorks", "CATIA", "IR Sensing"],
    highlight: "First engineer at PT Semen Baturaja to apply thermo-structural coupled simulation to the rotary kiln using real infrared boundary conditions.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  EXP_02: {
    location: "UNSW Sydney, Kensington NSW",
    type: "Research Engineering",
    status: "Active",
    impact: "19 Pa",
    impactLabel: "→ Target <10 Pa shear stress",
    tools: ["ANSYS Fluent", "C / UDF", "CAD Modeling", "CFD Analysis"],
    highlight: "Developing UDF code in C to simulate nutation motion of a Total Artificial Heart — supporting a world-first design at UNSW.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  EXP_03: {
    location: "UNSW Sydney, Kensington NSW",
    type: "Student Engineering Team",
    status: "Active",
    impact: "Cd 0.97",
    impactLabel: "AUV drag at 1 m/s",
    tools: ["SolidWorks CAD", "ANSYS FEA", "ANSYS CFD", "3D Printing", "Laser Cutting"],
    highlight: "Led chassis and thruster bracket design for SAUVC 2026. Pressure hull validated to 5 m depth via FEA before manufacture.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  EXP_04: {
    location: "Sydney, NSW, Australia",
    type: "Media & Outreach",
    status: "Active",
    impact: "23k+",
    impactLabel: "Instagram followers managed",
    tools: ["Adobe Photoshop", "Content Strategy", "Copywriting", "Social Media"],
    highlight: "Managed digital communications for PPI Australia, bridging the Indonesian student community across multiple universities in NSW.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Page header */}
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label mb-2">Background</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">Work Experience</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Industrial internships, research roles, competitive engineering teams, and student leadership — all while maintaining a 3.64 GPA.
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { label: "Total Roles", value: "4" },
            { label: "Currently Active", value: "3" },
            { label: "Countries", value: "2" },
            { label: "Timeline", value: "2022–Now" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-8">
            {DATA.experience.map((exp, i) => {
              const meta = EXP_META[exp.id];
              if (!meta) return null;
              const isActive = meta.status === "Active";

              return (
                <motion.div
                  key={exp.id}
                  {...fadeUp(i * 0.1)}
                  className="relative pl-14 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 sm:left-3 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isActive ? "border-primary bg-primary/10" : "border-border bg-white"
                  }`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    {!isActive && <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
                  </div>

                  {/* Card */}
                  <div className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {/* Top bar */}
                    <div className={`h-1 ${meta.bg}`} />

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          {/* Status + type badges */}
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.border} ${meta.bg} ${meta.color}`}>
                              {meta.status}
                            </span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{meta.type}</span>
                          </div>

                          <h2 className="text-lg sm:text-xl font-semibold text-foreground leading-snug">{exp.title}</h2>
                        </div>

                        {/* Impact card */}
                        <div className={`flex-shrink-0 ${meta.bg} border ${meta.border} rounded-xl px-4 py-3 text-center min-w-[100px]`}>
                          <div className={`text-xl font-bold ${meta.color}`}>{meta.impact}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight max-w-[90px]">{meta.impactLabel}</div>
                        </div>
                      </div>

                      {/* Company / location / date */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5">
                          <Building2 size={13} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {meta.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {exp.date}
                        </span>
                      </div>

                      {/* Points */}
                      <ul className="space-y-2 mb-5">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircle2 size={14} className={`${meta.color} flex-shrink-0 mt-0.5`} />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Highlight */}
                      <div className={`${meta.bg} border ${meta.border} rounded-lg p-4 mb-4`}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Zap size={12} className={meta.color} />
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}>Key Highlight</span>
                        </div>
                        <p className="text-sm text-foreground/80 italic leading-relaxed">"{meta.highlight}"</p>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1.5">
                        {meta.tools.map((t) => (
                          <span key={t} className="tag-gray text-[11px]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © 2026 Zaki Fathi Fahrizal
        </div>
      </footer>
    </div>
  );
}
