import { Router, type IRouter } from "express";
import { db, projectsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

// Get all projects
router.get("/", async (_req, res) => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.display_order));
    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);

    if (project.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(project[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create new project
router.post("/", async (req, res) => {
  try {
    const project = await db
      .insert(projectsTable)
      .values(req.body)
      .returning();

    return res.status(201).json(project[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Failed to create project" });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await db
      .update(projectsTable)
      .set({ ...req.body, updated_at: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();

    if (project.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json(project[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning();

    if (project.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
