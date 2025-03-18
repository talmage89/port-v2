import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar, boolean, integer } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  demoUrl: text("demo_url"),
  codeUrl: text("code_url"),
  caseStudyUrl: text("case_study_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectRelations = relations(projects, ({ many }) => ({
  tags: many(projectTags),
}));

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  projectId: integer("project_id"),
});

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
}));

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", {
    length: 100,
    enum: ["frontend", "backend", "database", "cloud", "other"],
  }),
  description: text("description"),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  reason: varchar("reason", {
    length: 255,
    enum: ["hire", "collaborate", "other"],
  }),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});
