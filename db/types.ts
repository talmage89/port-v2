import { formSubmissions, projects, projectsToProjectTags, projectTags } from "./schema";

export type ProjectTag = typeof projectTags.$inferSelect;
export type ProjectsToProjectTags = typeof projectsToProjectTags.$inferSelect;
export type ProjectToProjectTagWithTag = ProjectsToProjectTags & { tag: ProjectTag };
export type Project = typeof projects.$inferSelect & { projectsToProjectTags: ProjectToProjectTagWithTag[] };
export type FormSubmission = typeof formSubmissions.$inferSelect;
