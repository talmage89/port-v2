"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { projects, projectTags, projectsToProjectTags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  codeUrl: z.string().nullable(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

export async function getAllTags() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Get all available tags for the form
    const allTags = await db.select().from(projectTags);

    return {
      success: true,
      allTags: allTags.map((tag) => tag.name),
    };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function createProject(data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = createProjectSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error("Invalid request data");
    }

    // Create project in a transaction
    let projectId: number = 0; // Initialize with a default value
    
    await db.transaction(async (tx) => {
      // Create project first
      const [newProject] = await tx
        .insert(projects)
        .values({
          title: validatedData.data.title,
          description: validatedData.data.description,
          imageUrl: validatedData.data.imageUrl,
          liveUrl: validatedData.data.liveUrl,
          codeUrl: validatedData.data.codeUrl,
          featured: validatedData.data.featured,
        })
        .returning({ id: projects.id });
      
      projectId = newProject.id;

      // Handle tags if provided
      if (validatedData.data.tags && validatedData.data.tags.length > 0) {
        // Get or create tags and create relationships
        for (const tagName of validatedData.data.tags) {
          // Find if tag exists
          let tag = await tx
            .select()
            .from(projectTags)
            .where(eq(projectTags.name, tagName))
            .limit(1);

          // Create tag if it doesn't exist
          if (tag.length === 0) {
            const newTag = await tx
              .insert(projectTags)
              .values({ name: tagName })
              .returning();
            tag = newTag;
          }

          // Create the relationship
          await tx.insert(projectsToProjectTags).values({
            projectId: projectId,
            tagId: tag[0].id,
          });
        }
      }
    });

    return { success: true, projectId };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
} 