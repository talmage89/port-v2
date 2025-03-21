import { db } from "@/db";
import { projectTags } from "@/db/schema";
import { Filters, ProjectCard } from "@/components/impl";
import { TAGS_PARAM } from "../config";

export const ProjectsGrid = async ({ selectedTags }: { selectedTags?: string[] }) => {
  const getTags = async () => {
    const tags = await db.selectDistinct({ name: projectTags.name }).from(projectTags);
    return tags.map(({ name }) => name);
  };

  const getProjects = async (tags?: string[]) => {
    const projectIds = tags
      ? (
          await db.query.projectTags.findMany({
            where: (projectTags, { inArray }) => inArray(projectTags.name, tags),
            with: { projectsToProjectTags: true },
          })
        )
          .flatMap((tag) => tag.projectsToProjectTags)
          .map((tag) => tag.projectId)
      : undefined;

    const projectsData = await db.query.projects.findMany({
      with: { projectsToProjectTags: { with: { tag: true } }, projectCaseStudies: true },
      where: projectIds ? (projects, { inArray }) => inArray(projects.id, projectIds) : undefined,
      orderBy: (projects, { asc }) => [asc(projects.order)],
    });

    return projectsData;
  };

  const tags = await getTags();
  const projectsData = await getProjects(selectedTags);

  return (
    <>
      <Filters options={tags} optionParam={TAGS_PARAM} />
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};
