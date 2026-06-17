import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, X, ChevronLeft, ChevronRight,
  Building2, Calendar, Tag, Images, ZoomIn
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { DATA } from "@/data/portfolio";
import {
  PROJECT_01_IMAGES, PROJECT_02_IMAGES,
  PROJECT_04_IMAGES, PROJECT_05_IMAGES,
  type ProjectImage,
} from "@/data/project-images";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

const PROJECT_COLORS: Record<string, string> = {
  "01": "bg-blue-50 text-blue-700 border-blue-200",
  "02": "bg-violet-50 text-violet-700 border-violet-200",
  "03": "bg-rose-50 text-rose-700 border-rose-200",
  "04": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "05": "bg-amber-50 text-amber-700 border-amber-200",
};

const PROJECT_BADGES: Record<string, string> = {
  "01": "CFD",
  "02": "FEA",
  "03": "Biomedical CFD",
  "04": "ROV Design",
  "05": "Structural FEA",
};

const PROJECT_IMAGES: Record<string, ProjectImage[]> = {
  "01": PROJECT_01_IMAGES,
  "02": PROJECT_02_IMAGES,
  "03": [],
  "04": PROJECT_04_IMAGES,
  "05": PROJECT_05_IMAGES,
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
}: {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <X size={20} />
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Image */}
      <div
        className="max-w-5xl w-full mx-12 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].caption}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="max-h-[75vh] w-full object-contain rounded-lg"
          />
        </AnimatePresence>
        <div className="text-center">
          <p className="text-white/90 text-sm leading-relaxed max-w-xl">{images[current].caption}</p>
          <p className="text-white/40 text-xs mt-1 font-mono">{current + 1} / {images.length}</p>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-colors ${
                  i === current ? "border-white" : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Image Gallery (in-card) ───────────────────────────────────────────────────
function ImageGallery({ images, onOpen }: { images: ProjectImage[]; onOpen: (i: number) => void }) {
  if (!images || images.length === 0) return null;

  const preview = images.slice(0, 4);
  const remaining = images.length - 4;

  return (
    <div className="border-t border-border">
      <div className="px-6 py-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Images size={13} />
          {images.length} images
        </span>
        <button
          onClick={() => onOpen(0)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all
        </button>
      </div>
      <div className="px-6 pb-5 grid grid-cols-4 gap-2">
        {preview.map((img, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            className="relative aspect-square rounded-lg overflow-hidden group bg-muted"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* "+N more" badge on last thumbnail */}
            {i === 3 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">+{remaining}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof DATA.projects[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const colorClass = PROJECT_COLORS[project.id] || "bg-slate-50 text-slate-700 border-slate-200";
  const badge = PROJECT_BADGES[project.id] || "Project";
  const images = PROJECT_IMAGES[project.id] ?? [];

  return (
    <>
      <motion.div
        {...fadeUp(index * 0.07)}
        className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        {/* Card header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
                {badge}
              </span>
              <span className="text-xs font-mono text-muted-foreground">#{project.id}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
              <Calendar size={12} />
              {project.date}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground leading-snug mb-2">{project.title}</h2>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Building2 size={14} className="flex-shrink-0" />
            <span>{project.company}</span>
            {project.role && (
              <>
                <span className="text-border">·</span>
                <span className="italic">{project.role}</span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{project.what}</p>

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 tag-gray text-[11px]">
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image gallery */}
        {images.length > 0 && (
          <ImageGallery images={images} onOpen={(i) => setLightboxIndex(i)} />
        )}

        {/* Expandable details */}
        <div className="border-t border-border">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <span>{open ? "Hide Details" : "Show Full Details"}</span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-5">
                  {(project as any).problem && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Problem</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{(project as any).problem}</p>
                    </div>
                  )}
                  {(project as any).method && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Methodology</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{(project as any).method}</p>
                    </div>
                  )}
                  {(project as any).methodSteps && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Steps</h4>
                      <ol className="space-y-1.5">
                        {(project as any).methodSteps.map((step: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="font-mono text-primary text-xs mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {(project as any).results && Array.isArray((project as any).results) && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Results</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(project as any).results.map((r: any) => (
                          <div key={r.number} className="bg-card border border-border rounded-lg p-4">
                            <div className="text-xs font-mono text-primary mb-1">{r.number}</div>
                            <div className="font-semibold text-sm text-foreground mb-1">{r.title}</div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{r.text}</p>
                            <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{r.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(project as any).result && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Key Outcome</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{(project as any).result}</p>
                    </div>
                  )}
                  {(project as any).learnings && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Learnings</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">{(project as any).learnings}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
            CFD, FEA, and mechanical design projects spanning cement manufacturing, biomedical devices, and competitive robotics — with simulation results and real field photos.
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

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {DATA.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © 2026 Zaki Fathi Fahrizal
        </div>
      </footer>
    </div>
  );
}
