import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Calendar, Tag, ArrowRight, Images } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { DATA } from "@/data/portfolio";
import {
  PROJECT_01_IMAGES, PROJECT_02_IMAGES,
  PROJECT_04_IMAGES, PROJECT_05_IMAGES,
} from "@/data/project-images";

const IMAGE_COUNTS: Record<string, number> = {
  "01": PROJECT_01_IMAGES.length,
  "02": PROJECT_02_IMAGES.length,
  "03": 0,
  "04": PROJECT_04_IMAGES.length,
  "05": PROJECT_05_IMAGES.length,
};

const PREVIEW_IMAGES: Record<string, string> = {
  "01": PROJECT_01_IMAGES[0]?.src ?? "",
  "02": PROJECT_02_IMAGES[0]?.src ?? "",
  "03": "",
  "04": PROJECT_04_IMAGES[0]?.src ?? "",
  "05": PROJECT_05_IMAGES[0]?.src ?? "",
};

const PROJECT_ACCENT: Record<string, { badge: string; color: string; bg: string; border: string }> = {
  "01": { badge: "CFD Analysis", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  "02": { badge: "FEA / Thermal", color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  "03": { badge: "Biomedical CFD", color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  "04": { badge: "ROV Design", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  "05": { badge: "Structural FEA", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Page header */}
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label mb-2">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">Engineering Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            CFD, FEA, and mechanical design projects spanning cement manufacturing, biomedical devices, and competitive robotics. Click any project to view all images and full details.
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Projects", value: "5" },
            { label: "Max Temperature", value: "1450°C" },
            { label: "Kiln Model", value: "72 m" },
            { label: "Safety Factor", value: ">13×" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Project cards — click to open detail page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {DATA.projects.map((project, i) => {
            const accent = PROJECT_ACCENT[project.id] ?? PROJECT_ACCENT["01"];
            const imgCount = IMAGE_COUNTS[project.id] ?? 0;
            const previewSrc = PREVIEW_IMAGES[project.id];

            return (
              <motion.div key={project.id} {...fadeUp(i * 0.07)}>
                <Link href={`/projects/${project.id}`}>
                  <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer h-full flex flex-col">
                    {/* Preview image */}
                    <div className="relative h-44 bg-muted overflow-hidden flex-shrink-0">
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full ${accent.bg} flex items-center justify-center`}>
                          <span className={`text-4xl font-bold ${accent.color} opacity-20`}>#{project.id}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {imgCount > 0 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                          <Images size={11} />
                          {imgCount} images
                        </div>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white text-primary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          View full project <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${accent.bg} ${accent.color} ${accent.border}`}>
                            {accent.badge}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">#{project.id}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                          <Calendar size={12} />
                          {project.date}
                        </div>
                      </div>

                      <h2 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">{project.title}</h2>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Building2 size={12} className="flex-shrink-0" />
                        <span>{project.company}</span>
                        {project.role && (
                          <>
                            <span className="text-border">·</span>
                            <span className="italic truncate">{project.role}</span>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">{project.what}</p>

                      {/* Tools */}
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tools.slice(0, 4).map((t) => (
                            <span key={t} className="inline-flex items-center gap-1 tag-gray text-[11px]">
                              <Tag size={9} />{t}
                            </span>
                          ))}
                          {project.tools.length > 4 && (
                            <span className="tag-gray text-[11px]">+{project.tools.length - 4}</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">Click to view full project</span>
                        <ArrowRight size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
