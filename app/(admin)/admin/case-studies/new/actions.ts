"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { projects, projectCaseStudies, projectCaseStudiesTechnologies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createCaseStudySchema = z.object({
  projectId: z.number(),
  problem: z.string().nullable(),
  approach: z.string().nullable(),
  solution: z.string().nullable(),
  challenges: z.string().nullable(),
  results: z.string().nullable(),
  technologies: z.array(z.string()).optional(),
});

export async function getProjects() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Fetch all projects for the dropdown
    const allProjects = await db.select({
      id: projects.id,
      title: projects.title,
    }).from(projects);

    return {
      success: true,
      projects: allProjects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function createCaseStudy(data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = createCaseStudySchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error("Invalid request data");
    }

    // Check if project exists
    const projectExists = await db.select().from(projects).where(eq(projects.id, validatedData.data.projectId)).limit(1);

    if (projectExists.length === 0) {
      throw new Error("Project not found");
    }

    // Create in a transaction
    let caseStudyId: number = 0;
    
    await db.transaction(async (tx) => {
      // Create case study
      const [newCaseStudy] = await tx
        .insert(projectCaseStudies)
        .values({
          projectId: validatedData.data.projectId,
          problem: validatedData.data.problem,
          approach: validatedData.data.approach,
          solution: validatedData.data.solution,
          challenges: validatedData.data.challenges,
          results: validatedData.data.results,
        })
        .returning({ id: projectCaseStudies.id });
      
      caseStudyId = newCaseStudy.id;

      // Handle technologies if provided
      if (validatedData.data.technologies && validatedData.data.technologies.length > 0) {
        const techsToInsert = validatedData.data.technologies.map((name: string) => ({
          name,
          caseStudyId: caseStudyId
        }));
        
        await tx.insert(projectCaseStudiesTechnologies).values(techsToInsert);
      }
    });

    return { success: true, caseStudyId };
  } catch (error) {
    console.error("Error creating case study:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
} 