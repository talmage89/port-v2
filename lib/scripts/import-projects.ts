import { db } from "@/db";
import { projects, projectTags, projectsToProjectTags } from "@/db/schema";
import { ProjectsToProjectTags } from "@/db/types";
import { projectsData } from "../data/projectsData";

async function importProjects() {
  try {
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
