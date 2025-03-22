"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { projects, projectCaseStudies, projectCaseStudiesTechnologies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateCaseStudySchema = z.object({
  problem: z.string().nullable(),
  approach: z.string().nullable(),
  solution: z.string().nullable(),
  challenges: z.string().nullable(),
  results: z.string().nullable(),
  technologies: z.array(z.string()).optional(),
});

export async function getCaseStudy(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }

    // Fetch case study with project data and technologies
    const caseStudyResult = await db.query.projectCaseStudies.findFirst({
      where: eq(projectCaseStudies.id, id),
      with: {
        project: true,
        technologies: true,
      },
    });

    if (!caseStudyResult) {
      throw new Error("Case study not found");
    }

    return {
      caseStudy: caseStudyResult,
      project: caseStudyResult.project,
      technologies: caseStudyResult.technologies.map((tech) => tech.name),
    };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function updateCaseStudy(id: number, data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = updateCaseStudySchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    // Check if case study exists
    const existingCaseStudy = await db.select().from(projectCaseStudies).where(eq(projectCaseStudies.id, id)).limit(1);

    if (existingCaseStudy.length === 0) {
      throw new Error("Case study not found");
    }

    // Update in a transaction
    await db.transaction(async (tx) => {
      // Update case study
      await tx
        .update(projectCaseStudies)
        .set({
          problem: validatedData.data.problem,
          approach: validatedData.data.approach,
          solution: validatedData.data.solution,
          challenges: validatedData.data.challenges,
          results: validatedData.data.results,
        })
        .where(eq(projectCaseStudies.id, id));

      // Handle technologies if provided
      if (validatedData.data.technologies) {
        // Delete existing technologies
        await tx.delete(projectCaseStudiesTechnologies).where(eq(projectCaseStudiesTechnologies.caseStudyId, id));

        // Insert new technologies
        if (validatedData.data.technologies.length > 0) {
          const techsToInsert = validatedData.data.technologies.map((name) => ({
            name,
            caseStudyId: id,
          }));

          await tx.insert(projectCaseStudiesTechnologies).values(techsToInsert);
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating case study:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function deleteCaseStudy(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Check if case study exists
    const existingCaseStudy = await db.select().from(projectCaseStudies).where(eq(projectCaseStudies.id, id)).limit(1);

    if (existingCaseStudy.length === 0) {
      throw new Error("Case study not found");
    }

    // Delete in a transaction
    await db.transaction(async (tx) => {
      // Delete case study
      await tx.delete(projectCaseStudies).where(eq(projectCaseStudies.id, id));

      // Delete associated technologies
      await tx.delete(projectCaseStudiesTechnologies).where(eq(projectCaseStudiesTechnologies.caseStudyId, id));
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}
