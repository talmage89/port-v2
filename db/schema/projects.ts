import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar, boolean, integer, primaryKey } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  codeUrl: text("code_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  order: integer("order").default(0),
});

export const projectRelations = relations(projects, ({ many }) => ({
  projectsToProjectTags: many(projectsToProjectTags),
  projectCaseStudies: many(projectCaseStudies),
}));

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const projectTagsRelations = relations(projectTags, ({ many }) => ({
  projectsToProjectTags: many(projectsToProjectTags),
}));

export const projectsToProjectTags = pgTable(
  "projects_to_tags",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => projectTags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.tagId] })],
);

export const projectsToTagsRelations = relations(projectsToProjectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectsToProjectTags.projectId],
    references: [projects.id],
  }),
  tag: one(projectTags, {
    fields: [projectsToProjectTags.tagId],
    references: [projectTags.id],
  }),
}));

export const projectCaseStudies = pgTable("project_case_studies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  problem: text("problem"),
  approach: text("approach"),
  solution: text("solution"),
  challenges: text("challenges"),
  results: text("results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectCaseStudiesRelations = relations(projectCaseStudies, ({ one, many }) => ({
  technologies: many(projectCaseStudiesTechnologies),
  project: one(projects, {
    fields: [projectCaseStudies.projectId],
    references: [projects.id],
  }),
}));

export const projectCaseStudiesTechnologies = pgTable("project_case_studies_technologies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  caseStudyId: integer("case_study_id")
    .notNull()
    .references(() => projectCaseStudies.id, { onDelete: "cascade" }),
});

export const projectCaseStudiesTechnologiesRelations = relations(projectCaseStudiesTechnologies, ({ one }) => ({
  caseStudy: one(projectCaseStudies, {
    fields: [projectCaseStudiesTechnologies.caseStudyId],
    references: [projectCaseStudies.id],
  }),
}));
