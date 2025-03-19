import { db } from "@/db";
import { projects, projectTags, projectsToProjectTags } from "@/db/schema";
import { ProjectsToProjectTags } from "@/db/types";

async function importProjects() {
  try {
    const projectsData = [
      {
        title: "E-Commerce Platform",
        description:
          "A modern e-commerce platform built with Next.js, Stripe, and a headless CMS. Features include product filtering, user accounts, and secure checkout.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        codeUrl: "https://github.com/yourusername/project",
        caseStudyUrl: "/projects/e-commerce-platform",
        featured: true,
        tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, team workspace, and integration with popular productivity tools.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        codeUrl: "https://github.com/yourusername/project",
        caseStudyUrl: "/projects/task-management",
        featured: true,
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      },
      {
        title: "Personal Finance Dashboard",
        description:
          "An intuitive dashboard for tracking expenses, investments, and financial goals with data visualization and insights.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        caseStudyUrl: "/projects/finance-dashboard",
        featured: true,
        tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      },
    ];

    await db.transaction(async (tx) => {
      const tags = projectsData.reduce((acc, project) => {
        project.tags.forEach((tag) => {
          !acc.includes(tag) && acc.push(tag);
        });
        return acc;
      }, [] as string[]);

      const existingTags = await tx.select().from(projectTags);
      const existingTagNames = existingTags.map((tag) => tag.name);

      const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

      let tagsResult = existingTags;
      if (newTags.length > 0) {
        const newTagsResult = await tx
          .insert(projectTags)
          .values(newTags.map((tag) => ({ name: tag })))
          .returning();

        tagsResult = [...existingTags, ...newTagsResult];
      }

      for (const project of projectsData) {
        const { tags, ...projectFields } = project;
        const projectResult = await tx.insert(projects).values(projectFields).returning();

        const relationsData = tags.map((tag) => ({
          projectId: projectResult[0].id,
          tagId: tagsResult.find((t) => t.name === tag)?.id,
        }));

        await tx.insert(projectsToProjectTags).values(relationsData as ProjectsToProjectTags[]);
      }

      console.log(`✅ Successfully imported ${projectsData.length} projects!`);
    });
  } catch (error) {
    console.error("❌ Error importing projects:", error);
    throw error;
  }
}

importProjects();
