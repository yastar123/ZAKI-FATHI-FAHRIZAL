import { Router, type IRouter } from "express";
import { db, projectImagesTable } from "@workspace/db";
import { eq, or, sql } from "drizzle-orm";

const router: IRouter = Router();

function buildProjectImageLookupConditions(rawId: string) {
  const trimmedId = rawId.trim();
  const parsedId = Number(trimmedId);
  const canonicalId = trimmedId.replace(/^0+/, "") || "0";

  const conditions = [
    sql`CAST(${projectImagesTable.project_id} AS TEXT) = ${trimmedId}`,
    sql`CAST(${projectImagesTable.project_id} AS TEXT) = ${canonicalId}`,
  ];

  if (Number.isInteger(parsedId)) {
    conditions.push(eq(projectImagesTable.project_id, parsedId));
  }

  return or(...conditions);
}

// Get all images for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId?.trim()) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const images = await db
      .select()
      .from(projectImagesTable)
      .where(buildProjectImageLookupConditions(projectId))
      .orderBy(projectImagesTable.display_order);

    return res.json(images);
  } catch (error) {
    console.error("Error fetching project images:", error);
    return res.status(500).json({ error: "Failed to fetch project images" });
  }
});

// Get single image by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid image ID" });
    }

    const image = await db
      .select()
      .from(projectImagesTable)
      .where(eq(projectImagesTable.id, id))
      .limit(1);

    if (image.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.json(image[0]);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Failed to fetch image" });
  }
});

// Create new project image
router.post("/", async (req, res) => {
  try {
    const image = await db
      .insert(projectImagesTable)
      .values(req.body)
      .returning();

    return res.status(201).json(image[0]);
  } catch (error) {
    console.error("Error creating project image:", error);
    return res.status(500).json({ error: "Failed to create project image" });
  }
});

// Update project image
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid image ID" });
    }

    const image = await db
      .update(projectImagesTable)
      .set(req.body)
      .where(eq(projectImagesTable.id, id))
      .returning();

    if (image.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.json(image[0]);
  } catch (error) {
    console.error("Error updating project image:", error);
    return res.status(500).json({ error: "Failed to update project image" });
  }
});

// Delete project image
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid image ID" });
    }

    const image = await db
      .delete(projectImagesTable)
      .where(eq(projectImagesTable.id, id))
      .returning();

    if (image.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting project image:", error);
    return res.status(500).json({ error: "Failed to delete project image" });
  }
});

export default router;
