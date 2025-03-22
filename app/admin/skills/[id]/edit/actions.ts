"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum([
    "frontend",
    "backend",
    "database",
    "cloud",
    "devops",
    "testing",
    "framework",
    "mobile",
    "design",
    "AI",
    "other",
  ]),
  description: z.string().nullable(),
  order: z.number().default(0),
});

export async function getSkill(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }

    // Fetch skill
    const result = await db.select().from(skills).where(eq(skills.id, id)).limit(1);

    if (result.length === 0) {
      throw new Error("Skill not found");
    }

    return {
      skill: result[0],
    };
  } catch (error) {
    console.error("Error fetching skill:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function updateSkill(id: number, data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = updateSkillSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    // Check if skill exists
    const existingSkill = await db.select().from(skills).where(eq(skills.id, id)).limit(1);

    if (existingSkill.length === 0) {
      throw new Error("Skill not found");
    }

    // Update skill
    await db
      .update(skills)
      .set({
        name: validatedData.data.name,
        category: validatedData.data.category,
        description: validatedData.data.description,
        order: validatedData.data.order,
      })
      .where(eq(skills.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error updating skill:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}

export async function deleteSkill(id: number) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Check if skill exists
    const existingSkill = await db.select().from(skills).where(eq(skills.id, id)).limit(1);

    if (existingSkill.length === 0) {
      throw new Error("Skill not found");
    }

    // Delete skill
    await db.delete(skills).where(eq(skills.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
}
