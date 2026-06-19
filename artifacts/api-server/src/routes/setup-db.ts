import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { projectsTable, projectImagesTable } from "@workspace/db/schema";

const router: IRouter = Router();

// Setup database tables
router.post("/", async (_req, res) => {
  try {
    // This is a simple endpoint to check if database connection works
    // In production, you should use proper migrations
    const result = await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        date TEXT NOT NULL,
        what TEXT NOT NULL,
        background TEXT NOT NULL,
        problem TEXT NOT NULL,
        solution TEXT NOT NULL,
        method TEXT NOT NULL,
        result TEXT NOT NULL,
        conclusion TEXT NOT NULL,
        benefits TEXT NOT NULL,
        learnings TEXT NOT NULL,
        method_steps JSONB NOT NULL,
        results JSONB NOT NULL,
        components JSONB NOT NULL,
        tools JSONB NOT NULL,
        badge TEXT NOT NULL,
        display_order INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS project_images (
        id SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL REFERENCES projects(id),
        src TEXT NOT NULL,
        caption TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'site',
        display_order INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    return res.json({ 
      success: true, 
      message: "Database tables created successfully" 
    });
  } catch (error) {
    console.error("Error setting up database:", error);
    return res.status(500).json({ 
      error: "Failed to setup database",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
