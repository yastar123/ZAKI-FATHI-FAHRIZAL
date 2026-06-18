import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import {
  ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight,
  Building2, Calendar, Tag, ZoomIn, ChevronRight as Chevron
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { DATA } from "@/data/portfolio";
import {
  PROJECT_01_IMAGES, PROJECT_02_IMAGES,
  PROJECT_04_IMAGES, PROJECT_05_IMAGES,
  type ProjectImage,
} from "@/data/project-images";

const PROJECT_IMAGES: Record<string, ProjectImage[]> = {
  "01": PROJECT_01_IMAGES,
  "02": PROJECT_02_IMAGES,
  "03": [],
  "04": PROJECT_04_IMAGES,
  "05": PROJECT_05_IMAGES,
};

const PROJECT_ACCENT: Record<string, { badge: string; color: string; bg: string; border: string; bar: string }> = {
  "01": { badge: "CFD Analysis", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", bar: "bg-blue-600" },
  "02": { badge: "FEA / Thermal", color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200", bar: "bg-violet-600" },
  "03": { badge: "Biomedical CFD", color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", bar: "bg-rose-600" },
  "04": { badge: "ROV Design", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-600" },
  "05": { badge: "Structural FEA", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", bar: "bg-amber-600" },
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: { images: ProjectImage[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
        <X size={20} />
      </button>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
            <ChevronRight size={20} />
          </button>
        </>
      )}
      <div className="max-w-5xl w-full mx-12 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].caption}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="max-h-[72vh] w-full object-contain rounded-xl"
          />
        </AnimatePresence>
        <div className="text-center">
          <p className="text-white/90 text-sm leading-relaxed max-w-2xl">{images[current].caption}</p>
          <p className="text-white/40 text-xs mt-1 font-mono">{current + 1} / {images.length}</p>
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto max-w-full pb-1 px-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === current ? "border-white scale-105" : "border-white/20 opacity-50 hover:opacity-80"}`}>
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Image Grid ────────────────────────────────────────────────────────────────
function ImageGrid({ images, onOpen }: { images: ProjectImage[]; onOpen: (i: number) => void }) {
  if (!images || images.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm">
        No images available for this project yet.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {images.map((img, i) => (
        <button key={i} onClick={() => onOpen(i)}
          className="relative aspect-video rounded-xl overflow-hidden group bg-muted border border-border hover:border-primary/30 hover:shadow-md transition-all"
        >
          <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-2">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity w-full">
              <p className="text-white text-[10px] leading-snug line-clamp-2 text-left">{img.caption}</p>
            </div>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ZoomIn size={12} className="text-white" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
        <span className="w-3 h-[2px] bg-primary inline-block rounded" />
        {label}
      </h3>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const projectIndex = DATA.projects.findIndex((p) => p.id === projectId);
  const project = DATA.projects[projectIndex];
  const images = PROJECT_IMAGES[projectId] ?? [];
  const accent = PROJECT_ACCENT[projectId] ?? PROJECT_ACCENT["01"];

  const prevProject = projectIndex > 0 ? DATA.projects[projectIndex - 1] : null;
  const nextProject = projectIndex < DATA.projects.length - 1 ? DATA.projects[projectIndex + 1] : null;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found.</p>
          <Link href="/projects"><span className="text-primary hover:underline cursor-pointer">← Back to projects</span></Link>
        </div>
      </div>
    );
  }

  const p = project as any;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/projects"><span className="hover:text-primary transition-colors cursor-pointer">Projects</span></Link>
          <Chevron size={14} />
          <span className="text-foreground font-medium truncate">{project.title}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${accent.bg} ${accent.color} ${accent.border}`}>
              {accent.badge}
            </span>
            <span className="text-xs font-mono text-muted-foreground">Project #{project.id}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-snug mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><Building2 size={14} />{project.company}</span>
            {project.role && <span className="italic">{project.role}</span>}
            <span className="flex items-center gap-1.5"><Calendar size={14} />{project.date}</span>
          </div>

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t: string) => (
                <span key={t} className="inline-flex items-center gap-1.5 tag-gray text-xs">
                  <Tag size={11} />{t}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Image Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Project Gallery
              {images.length > 0 && <span className="ml-2 text-sm font-normal text-muted-foreground">({images.length} images)</span>}
            </h2>
          </div>
          <ImageGrid images={images} onOpen={(i) => setLightboxIndex(i)} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-8">
            {p.what && (
              <Section label="Overview">
                <p className="text-base text-foreground/80 leading-relaxed">{p.what}</p>
              </Section>
            )}

            {p.background && (
              <Section label="Background">
                <p className="text-sm text-foreground/80 leading-relaxed">{p.background}</p>
              </Section>
            )}

            {p.problem && (
              <Section label="Problem">
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="text-sm text-foreground/80 leading-relaxed">{p.problem}</p>
                </div>
              </Section>
            )}

            {p.solution && (
              <Section label="Solution">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-sm text-foreground/80 leading-relaxed">{p.solution}</p>
                </div>
              </Section>
            )}

            {p.method && (
              <Section label="Methodology">
                <p className="text-sm text-foreground/80 leading-relaxed">{p.method}</p>
              </Section>
            )}

            {p.methodSteps && p.methodSteps.length > 0 && (
              <Section label="Step-by-step Process">
                <ol className="space-y-3">
                  {p.methodSteps.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 ${accent.bar} text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5`}>
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {p.results && Array.isArray(p.results) && p.results.length > 0 && (
              <Section label="Results">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {p.results.map((r: any) => (
                    <div key={r.number} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                      <div className={`text-xs font-mono ${accent.color} mb-2`}>{r.number}</div>
                      <div className="font-semibold text-sm text-foreground mb-2">{r.title}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{r.text}</p>
                      <div className={`text-xs font-semibold ${accent.color} ${accent.bg} px-2.5 py-1 rounded-full inline-block`}>{r.metric}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {p.conclusion && (
              <Section label="Conclusion">
                <p className="text-sm text-foreground/80 leading-relaxed">{p.conclusion}</p>
              </Section>
            )}

            {p.benefits && (
              <Section label="Business Benefits">
                <p className="text-sm text-foreground/80 leading-relaxed">{p.benefits}</p>
              </Section>
            )}

            {p.learnings && (
              <Section label="What I Learned">
                <div className="border-l-4 border-primary/30 pl-4 py-1">
                  <p className="text-sm text-foreground/80 leading-relaxed italic">{p.learnings}</p>
                </div>
              </Section>
            )}
          </div>

          {/* Right column — sidebar */}
          <div className="space-y-5">
            {/* Key outcome */}
            {p.result && (
              <div className={`${accent.bg} border ${accent.border} rounded-xl p-5`}>
                <p className={`text-xs font-semibold uppercase tracking-wider ${accent.color} mb-2`}>Key Outcome</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{p.result}</p>
              </div>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t: string) => (
                    <span key={t} className="tag-gray text-xs">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Project details */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Project Details</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Organisation</p>
                  <p className="font-medium text-foreground">{project.company}</p>
                </div>
                {project.role && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Role</p>
                    <p className="font-medium text-foreground">{project.role}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Timeline</p>
                  <p className="font-medium text-foreground">{project.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Images</p>
                  <p className="font-medium text-foreground">{images.length} photos & diagrams</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next navigation */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
                <ArrowLeft size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Previous Project</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{prevProject.title}</p>
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link href={`/projects/${nextProject.id}`}>
              <div className="flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group text-right">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Next Project</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{nextProject.title}</p>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © 2026 Zaki Fathi Fahrizal
        </div>
      </footer>
    </div>
  );
}
