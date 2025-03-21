"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { z } from "zod";

const createSkillSchema = z.object({
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

export async function createSkill(data: any) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Parse and validate request body
    const validatedData = createSkillSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error("Invalid request data");
    }

    // Create skill
    await db.insert(skills).values({
      name: validatedData.data.name,
      category: validatedData.data.category,
      description: validatedData.data.description,
      order: validatedData.data.order,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { success: false, error: error instanceof Error ? error.message : "Internal Server Error" };
  }
} 