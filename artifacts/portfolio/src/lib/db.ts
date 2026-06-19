import { supabase } from "./supabase";
import type { Project, ProjectImage } from "./types";

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Project;
}

export async function createProject(
  project: Omit<Project, "created_at" | "updated_at">,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function updateProject(
  id: string,
  updates: Partial<Project>,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function copyProjectImages(
  sourceProjectId: string,
  targetProjectId: string,
): Promise<number> {
  const { data: images, error: fetchError } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", sourceProjectId)
    .order("display_order", { ascending: true });

  if (fetchError) throw fetchError;
  if (!images || images.length === 0) return 0;

  const rows = images.map(({ id, created_at, updated_at, ...img }) => ({
    ...img,
    project_id: targetProjectId,
  }));

  const { error } = await supabase.from("project_images").insert(rows);
  if (error) throw error;

  return rows.length;
}

// ── Project Images ────────────────────────────────────────────────────────────

export async function getProjectImages(
  projectId: string,
): Promise<ProjectImage[]> {
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ProjectImage[];
}

export async function addProjectImage(
  projectId: string,
  src: string,
  caption: string,
  type = "site",
  order = 0,
): Promise<ProjectImage> {
  const { data, error } = await supabase
    .from("project_images")
    .insert({ project_id: projectId, src, caption, type, display_order: order })
    .select()
    .single();
  if (error) throw error;
  return data as ProjectImage;
}

export async function updateProjectImage(
  id: string,
  updates: Partial<ProjectImage>,
): Promise<void> {
  const { error } = await supabase
    .from("project_images")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProjectImage(id: string): Promise<void> {
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderImages(
  images: { id: string; display_order: number }[],
): Promise<void> {
  for (const img of images) {
    await supabase
      .from("project_images")
      .update({ display_order: img.display_order })
      .eq("id", img.id);
  }
}
