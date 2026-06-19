import { customFetch } from "@workspace/api-client-react";
import type { Project, ProjectImage } from "./types";

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  return customFetch<Project[]>("/api/projects");
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    return await customFetch<Project>(`/api/projects/${id}`);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function createProject(
  project: Omit<Project, "created_at" | "updated_at">,
): Promise<Project> {
  return customFetch<Project>("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
}

export async function updateProject(
  id: string,
  updates: Partial<Project>,
): Promise<Project> {
  return customFetch<Project>(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await customFetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
}

export async function copyProjectImages(
  sourceProjectId: string,
  targetProjectId: string,
): Promise<number> {
  const images = await getProjectImages(sourceProjectId);

  if (!images || images.length === 0) return 0;

  let count = 0;
  for (const image of images) {
    try {
      await addProjectImage(
        targetProjectId,
        image.src,
        image.caption,
        image.type,
        image.display_order,
      );
      count++;
    } catch (error) {
      console.error("Error copying image:", error);
    }
  }

  return count;
}

// ── Project Images ────────────────────────────────────────────────────────────

export async function getProjectImages(
  projectId: string,
): Promise<ProjectImage[]> {
  return customFetch<ProjectImage[]>(`/api/project-images/project/${projectId}`);
}

export async function addProjectImage(
  projectId: string,
  src: string,
  caption: string,
  type = "site",
  order = 0,
): Promise<ProjectImage> {
  return customFetch<ProjectImage>("/api/project-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: parseInt(projectId),
      src,
      caption,
      type,
      display_order: order,
    }),
  });
}

export async function updateProjectImage(
  id: string,
  updates: Partial<ProjectImage>,
): Promise<void> {
  await customFetch(`/api/project-images/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
}

export async function deleteProjectImage(id: string): Promise<void> {
  await customFetch(`/api/project-images/${id}`, {
    method: "DELETE",
  });
}

export async function reorderImages(
  images: { id: string; display_order: number }[],
): Promise<void> {
  for (const img of images) {
    await updateProjectImage(img.id, { display_order: img.display_order });
  }
}
