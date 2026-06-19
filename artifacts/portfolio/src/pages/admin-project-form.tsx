import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Plus, Trash2, Upload, Loader2, GripVertical, X, AlertTriangle } from "lucide-react";
import { getProject, createProject, updateProject, getProjectImages, addProjectImage, deleteProjectImage } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { Project, ProjectImage, ResultItem, ComponentItem } from "@/lib/types";

const BADGE_OPTIONS = [
  "CFD Analysis", "FEA / Thermal", "Biomedical CFD", "ROV Design",
  "Structural FEA", "CAD Design", "Mechatronics", "Research", "Other"
];

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{children}</label>;
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white ${props.className ?? ""}`}
    />
  );
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white resize-none ${props.className ?? ""}`}
    />
  );
}

// ── Result Items ──────────────────────────────────────────────────────────────
function ResultsEditor({ value, onChange }: { value: ResultItem[]; onChange: (v: ResultItem[]) => void }) {
  function update(i: number, field: keyof ResultItem, val: string) {
    const next = value.map((r, idx) => (idx === i ? { ...r, [field]: val } : r));
    onChange(next);
  }
  function add() { onChange([...value, { number: String(value.length + 1).padStart(2, "0"), title: "", text: "", metric: "" }]); }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-3">
      {value.map((r, i) => (
        <div key={i} className="border border-border rounded-xl p-4 bg-gray-50 relative">
          <button onClick={() => remove(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"><X size={14} /></button>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <Label>Number</Label>
              <Input value={r.number} onChange={(e) => update(i, "number", e.target.value)} placeholder="01" />
            </div>
            <div>
              <Label>Metric</Label>
              <Input value={r.metric} onChange={(e) => update(i, "metric", e.target.value)} placeholder="e.g. 842°C Max Temp" />
            </div>
          </div>
          <div className="mb-2">
            <Label>Title</Label>
            <Input value={r.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Result title" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea rows={2} value={r.text} onChange={(e) => update(i, "text", e.target.value)} placeholder="Result description" />
          </div>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80">
        <Plus size={13} /> Add Result
      </button>
    </div>
  );
}

// ── Method Steps ──────────────────────────────────────────────────────────────
function StepsEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  function update(i: number, val: string) { onChange(value.map((s, idx) => idx === i ? val : s)); }
  function add() { onChange([...value, ""]); }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-2">
      {value.map((step, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center mt-2">{i + 1}</span>
          <Input value={step} onChange={(e) => update(i, e.target.value)} placeholder={`Step ${i + 1}`} />
          <button onClick={() => remove(i)} className="mt-2 text-muted-foreground hover:text-red-500 flex-shrink-0"><X size={14} /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80">
        <Plus size={13} /> Add Step
      </button>
    </div>
  );
}

// ── Components Editor ─────────────────────────────────────────────────────────
function ComponentsEditor({ value, onChange }: { value: ComponentItem[]; onChange: (v: ComponentItem[]) => void }) {
  function update(i: number, field: keyof ComponentItem, val: string) {
    onChange(value.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  }
  function add() { onChange([...value, { name: "", desc: "" }]); }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-2">
      {value.map((c, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input value={c.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Component name" />
            <Input value={c.desc} onChange={(e) => update(i, "desc", e.target.value)} placeholder="Description" />
          </div>
          <button onClick={() => remove(i)} className="mt-2 text-muted-foreground hover:text-red-500 flex-shrink-0"><X size={14} /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80">
        <Plus size={13} /> Add Component
      </button>
    </div>
  );
}

// ── Image Manager ─────────────────────────────────────────────────────────────
function ImageManager({ projectId }: { projectId: string }) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [imgType, setImgType] = useState("site");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProjectImages(projectId).then(setImages).catch(() => {});
  }, [projectId]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file, `portfolio/project-${projectId}`);
      const img = await addProjectImage(projectId, url, caption, imgType, images.length);
      setImages((prev) => [...prev, img]);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (e: any) {
      setError(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProjectImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (e: any) {
      setError(e.message ?? "Delete failed");
    }
  }

  return (
    <div>
      {/* Upload form */}
      <div className="bg-gray-50 border border-border rounded-xl p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Image caption (optional)"
            className="sm:col-span-2"
          />
          <select
            value={imgType}
            onChange={(e) => setImgType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none bg-white"
          >
            {["site", "cad", "cfd", "data", "chart", "software", "analysis", "test", "fea"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" id="img-upload" disabled={uploading} />
          <label
            htmlFor="img-upload"
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors ${uploading ? "bg-gray-200 text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:opacity-90"}`}
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Uploading…" : "Upload Image"}
          </label>
          {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} />{error}</p>}
        </div>
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 bg-gray-50 border border-dashed border-border rounded-xl">No images yet. Upload some above.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-video border border-border bg-gray-100">
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col justify-between p-2">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-[10px] leading-snug line-clamp-2">{img.caption}</p>
                  <span className="text-white/60 text-[9px]">{img.type}</span>
                </div>
              </div>
              <div className="absolute top-1.5 left-1.5">
                <GripVertical size={12} className="text-white/60" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────
interface Props { projectId?: string }

const EMPTY_PROJECT: Omit<Project, "created_at" | "updated_at"> = {
  id: "", title: "", role: "", company: "", date: "", badge: "CFD Analysis",
  what: "", background: "", problem: "", solution: "", method: "", result: "",
  conclusion: "", benefits: "", learnings: "",
  method_steps: [], results: [], components: [], tools: [], display_order: 0,
};

export default function AdminProjectForm({ projectId }: Props) {
  const isNew = !projectId;
  const [, navigate] = useLocation();
  const [form, setForm] = useState<Omit<Project, "created_at" | "updated_at">>(EMPTY_PROJECT);
  const [toolsInput, setToolsInput] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "detail" | "images">("basic");

  // Auth guard — redirect to /admin if not authenticated
  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "1") {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isNew && projectId) {
      getProject(projectId).then((p) => {
        if (p) {
          setForm(p);
          setToolsInput((p.tools ?? []).join(", "));
        }
        setLoading(false);
      });
    }
  }, [isNew, projectId]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.id || !form.title) { setError("ID and Title are required."); return; }
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, tools: toolsInput.split(",").map((t) => t.trim()).filter(Boolean) };
      if (isNew) { await createProject(payload); }
      else { await updateProject(form.id, payload); }
      navigate("/admin");
    } catch (e: any) {
      setError(e.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const TABS = [
    { id: "basic", label: "Basic Info" },
    { id: "detail", label: "Content & Results" },
    ...(isNew ? [] : [{ id: "images", label: "Images" }]),
  ] as const;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground">
              <ArrowLeft size={16} />
            </button>
          </Link>
          <h1 className="text-sm font-semibold text-foreground">{isNew ? "New Project" : `Edit: ${form.title.length > 40 ? form.title.slice(0, 40) + "…" : form.title}`}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50">Cancel</button>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-60"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? "Saving…" : isNew ? "Create Project" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
            <AlertTriangle size={15} className="flex-shrink-0" /> {error}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${activeTab === tab.id ? "bg-white shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Basic Info Tab ── */}
        {activeTab === "basic" && (
          <div className="space-y-5">
            <div className="bg-white border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-foreground text-sm">Project Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project ID *</Label>
                  <Input value={form.id} onChange={(e) => set("id", e.target.value)} placeholder="e.g. 06" disabled={!isNew} />
                  <p className="text-xs text-muted-foreground mt-1">Unique identifier, cannot be changed after creation.</p>
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={form.display_order} onChange={(e) => set("display_order", Number(e.target.value))} />
                </div>
              </div>
              <div>
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Project title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Your role" />
                </div>
                <div>
                  <Label>Company / Organisation</Label>
                  <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date / Timeline</Label>
                  <Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. Dec 2025 – Present" />
                </div>
                <div>
                  <Label>Badge / Category</Label>
                  <select
                    value={form.badge}
                    onChange={(e) => set("badge", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none bg-white"
                  >
                    {BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label>Tools (comma-separated)</Label>
                <Input value={toolsInput} onChange={(e) => setToolsInput(e.target.value)} placeholder="e.g. ANSYS CFD, SolidWorks, MATLAB" />
              </div>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-foreground text-sm">Summary</h2>
              <div>
                <Label>What / Overview</Label>
                <Textarea rows={3} value={form.what} onChange={(e) => set("what", e.target.value)} placeholder="Brief project overview" />
              </div>
              <div>
                <Label>Key Outcome / Result</Label>
                <Textarea rows={3} value={form.result} onChange={(e) => set("result", e.target.value)} placeholder="Key results and outcomes" />
              </div>
            </div>
          </div>
        )}

        {/* ── Detail Tab ── */}
        {activeTab === "detail" && (
          <div className="space-y-5">
            <div className="bg-white border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-foreground text-sm">Project Details</h2>
              {([
                ["background", "Background", 3],
                ["problem", "Problem", 3],
                ["solution", "Solution", 3],
                ["method", "Methodology", 4],
                ["conclusion", "Conclusion", 3],
                ["benefits", "Business Benefits", 3],
                ["learnings", "What I Learned", 3],
              ] as [keyof typeof form, string, number][]).map(([key, label, rows]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Textarea rows={rows} value={(form[key] as string) ?? ""} onChange={(e) => set(key, e.target.value)} placeholder={label} />
                </div>
              ))}
            </div>

            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground text-sm mb-4">Method Steps</h2>
              <StepsEditor value={form.method_steps ?? []} onChange={(v) => set("method_steps", v)} />
            </div>

            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground text-sm mb-4">Results</h2>
              <ResultsEditor value={form.results ?? []} onChange={(v) => set("results", v)} />
            </div>

            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground text-sm mb-4">Components</h2>
              <ComponentsEditor value={form.components ?? []} onChange={(v) => set("components", v)} />
            </div>
          </div>
        )}

        {/* ── Images Tab ── */}
        {activeTab === "images" && projectId && (
          <div className="bg-white border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground text-sm mb-4">Project Images</h2>
            <p className="text-xs text-muted-foreground mb-5">Upload images to Cloudinary. They'll appear in the project gallery.</p>
            <ImageManager projectId={projectId} />
          </div>
        )}

        <div className="h-12" />
      </div>
    </div>
  );
}
