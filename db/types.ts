import { formSubmissions, projects, projectsToProjectTags, projectTags, skills, projectCaseStudies } from "./schema";

export type ProjectTag = typeof projectTags.$inferSelect;
export type ProjectsToProjectTags = typeof projectsToProjectTags.$inferSelect;
export type ProjectToProjectTagWithTag = ProjectsToProjectTags & { tag: ProjectTag };
export type ProjectCaseStudy = typeof projectCaseStudies.$inferSelect;
export type Project = typeof projects.$inferSelect & {
  projectsToProjectTags: ProjectToProjectTagWithTag[];
  projectCaseStudies: ProjectCaseStudy[];
};
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type Skill = typeof skills.$inferSelect;
