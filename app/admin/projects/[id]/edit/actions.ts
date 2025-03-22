"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { projects, projectTags, projectsToProjectTags, projectCaseStudies } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { z } from "zod";

const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  codeUrl: z.string().nullable(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  tags: z.array(z.string()).optional(),
});

export async function getProject(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }

    // Fetch project
    const result = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: {
        projectsToProjectTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!result) {
      throw new Error("Project not found");
    }

    // Get all available tags for the form
    const allTags = await db.select().from(projectTags);

    return {
      project: result,
      tags: result.projectsToProjectTags.map((pt) => pt.tag.name),
      allTags: allTags.map((tag) => tag.name),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function updateProject(id: number, data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = updateProjectSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    // Check if project exists
    const existingProject = await db.select().from(projects).where(eq(projects.id, id)).limit(1);

    if (existingProject.length === 0) {
      throw new Error("Project not found");
    }

    // Update project in a transaction
    await db.transaction(async (tx) => {
      // Update project details
      await tx
        .update(projects)
        .set({
          title: validatedData.data.title,
          description: validatedData.data.description,
          imageUrl: validatedData.data.imageUrl,
          liveUrl: validatedData.data.liveUrl,
          codeUrl: validatedData.data.codeUrl,
          featured: validatedData.data.featured,
          order: validatedData.data.order,
        })
        .where(eq(projects.id, id));

      // Handle tags if provided
      if (validatedData.data.tags) {
        // Get existing tag relationships
        const existingTagRelations = await tx
          .select()
          .from(projectsToProjectTags)
          .where(eq(projectsToProjectTags.projectId, id));

        // Delete existing tag relationships
        if (existingTagRelations.length > 0) {
          await tx.delete(projectsToProjectTags).where(eq(projectsToProjectTags.projectId, id));
        }

        // Get or create tags and create new relationships
        for (const tagName of validatedData.data.tags) {
          // Find if tag exists
          let tag = await tx.select().from(projectTags).where(eq(projectTags.name, tagName)).limit(1);

          // Create tag if it doesn't exist
          if (tag.length === 0) {
            const newTag = await tx.insert(projectTags).values({ name: tagName }).returning();
            tag = newTag;
          }

          // Create the relationship
          await tx.insert(projectsToProjectTags).values({
            projectId: id,
            tagId: tag[0].id,
          });
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function deleteProject(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Check if project exists
    const existingProject = await db.select().from(projects).where(eq(projects.id, id)).limit(1);

    if (existingProject.length === 0) {
      throw new Error("Project not found");
    }

    // Delete in a transaction
    await db.transaction(async (tx) => {
      // Delete project
      await tx.delete(projects).where(eq(projects.id, id));

      // Delete associated case studies
      await tx.delete(projectCaseStudies).where(eq(projectCaseStudies.projectId, id));
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}
