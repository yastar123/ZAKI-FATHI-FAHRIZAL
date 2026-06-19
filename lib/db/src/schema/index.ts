import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects table
export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  date: text("date").notNull(),
  what: text("what").notNull(),
  background: text("background").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  method: text("method").notNull(),
  result: text("result").notNull(),
  conclusion: text("conclusion").notNull(),
  benefits: text("benefits").notNull(),
  learnings: text("learnings").notNull(),
  method_steps: jsonb("method_steps").notNull().$type<string[]>(),
  results: jsonb("results").notNull().$type<Array<{ number: string; title: string; text: string; metric: string }>>(),
  components: jsonb("components").notNull().$type<Array<{ name: string; desc: string }>>(),
  tools: jsonb("tools").notNull().$type<string[]>(),
  badge: text("badge").notNull(),
  display_order: integer("display_order").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ 
  id: true, 
  created_at: true, 
  updated_at: true 
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;

// Project images table
export const projectImagesTable = pgTable("project_images", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projectsTable.id),
  src: text("src").notNull(),
  caption: text("caption").notNull(),
  type: text("type").notNull().default("site"),
  display_order: integer("display_order").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertProjectImageSchema = createInsertSchema(projectImagesTable).omit({ 
  id: true, 
  created_at: true 
});
export type InsertProjectImage = z.infer<typeof insertProjectImageSchema>;
export type ProjectImage = typeof projectImagesTable.$inferSelect;