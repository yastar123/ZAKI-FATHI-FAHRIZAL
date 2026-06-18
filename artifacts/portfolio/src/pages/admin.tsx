import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Plus, Pencil, Trash2, Database, LogOut, ArrowUpDown,
  AlertTriangle, CheckCircle2, Loader2, Images, RefreshCw, ExternalLink
} from "lucide-react";
import AdminLogin from "./admin-login";
import { getProjects, deleteProject } from "@/lib/db";
import { runSeeder, type SeedProgress } from "@/lib/seed";
import type { Project } from "@/lib/types";

// ── Auth guard ────────────────────────────────────────────────────────────────
function useAdminAuth() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("admin_auth") === "1");
  const logout = () => { localStorage.removeItem("admin_auth"); setAuthed(false); };
  return { authed, login: () => setAuthed(true), logout };
}

// ── Confirm dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0" />
          <p className="text-sm text-foreground">{message}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Seeder modal ──────────────────────────────────────────────────────────────
function SeederModal({ onClose }: { onClose: () => void }) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<SeedProgress | null>(null);

  async function start() {
    setRunning(true);
    setError("");
    try {
      await runSeeder((p) => setProgress(p));
      setDone(true);
    } catch (e: any) {
      setError(e.message ?? "Seeding failed");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border shadow-lg p-6 max-w-md w-full">
        <h2 className="font-semibold text-foreground mb-1">Seed Database</h2>
        <p className="text-sm text-muted-foreground mb-5">
          This will import all 5 hardcoded projects into Supabase and upload their images to Cloudinary. Run once on first setup. Safe to re-run (upsert).
        </p>

        {progress && (
          <div className="mb-4 bg-gray-50 border border-border rounded-xl p-4">
            <div className="text-xs text-muted-foreground mb-2">{progress.step}</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: progress.total > 0 ? `${(progress.done / progress.total) * 100}%` : "0%" }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{progress.done}/{progress.total}</div>
          </div>
        )}

        {done && (
          <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
            <CheckCircle2 size={16} className="flex-shrink-0" />
            <span className="text-sm">Seeding complete! Refresh the projects page to see results.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} disabled={running} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50">
            {done ? "Close" : "Cancel"}
          </button>
          {!done && (
            <button onClick={start} disabled={running} className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-60">
              {running ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
              {running ? "Seeding…" : "Run Seeder"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Admin ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { authed, login, logout } = useAdminAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showSeeder, setShowSeeder] = useState(false);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try { setProjects(await getProjects()); } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted.");
    } catch (e: any) { showToast("Error: " + e.message); }
    setConfirmDelete(null);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  if (!authed) return <AdminLogin onLogin={login} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Database size={16} className="text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Portfolio Admin</h1>
            <p className="text-xs text-muted-foreground">Projects Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-gray-50 text-muted-foreground">
            <ExternalLink size={12} /> View Site
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-gray-50 text-muted-foreground">
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Action bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <p className="text-sm text-muted-foreground">{projects.length} project{projects.length !== 1 ? "s" : ""} in database</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSeeder(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs border border-border bg-white rounded-lg hover:bg-gray-50 text-muted-foreground"
            >
              <Database size={13} /> Seed Data
            </button>
            <button
              onClick={load}
              className="flex items-center gap-2 px-3 py-2 text-xs border border-border bg-white rounded-lg hover:bg-gray-50 text-muted-foreground"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <Link href="/admin/projects/new">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                <Plus size={15} /> New Project
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-12 text-center">
            <Database size={32} className="mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="text-sm text-muted-foreground mb-4">No projects yet. Seed the database or create one manually.</p>
            <button
              onClick={() => setShowSeeder(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              <Database size={14} /> Run Seeder
            </button>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell w-20">
                    <ArrowUpDown size={12} className="inline mr-1" />Order
                  </th>
                  <th className="px-4 py-3 w-24" />
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="text-xs font-mono text-muted-foreground bg-gray-100 px-1.5 py-0.5 rounded">{project.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground leading-snug line-clamp-1">{project.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <span className="inline-block bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium">{project.badge}</span>
                        <span className="flex items-center gap-0.5"><Images size={10} />{project.tools?.length ?? 0} tools</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground hidden md:table-cell text-xs">{project.company}</td>
                    <td className="px-4 py-4 text-muted-foreground hidden lg:table-cell text-xs">{project.date}</td>
                    <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell text-xs">{project.display_order}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Edit">
                            <Pencil size={14} />
                          </button>
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(project.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete project "${projects.find((p) => p.id === confirmDelete)?.title ?? confirmDelete}"? This will also remove all its images.`}
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      {showSeeder && <SeederModal onClose={() => { setShowSeeder(false); load(); }} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg z-50 animate-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  );
}
