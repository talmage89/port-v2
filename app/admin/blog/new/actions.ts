"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { blogs, blogTags, blogsToTags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).default([]),
});

export async function createBlog(data: any): Promise<{
  success: boolean;
  blogId?: number;
  error?: string;
}> {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Parse and validate request body
    const validatedData = createBlogSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, error: validatedData.error.message };
    }

    // Create in a transaction
    let blogId: number = 0;

    await db.transaction(async (tx) => {
      // Create blog post
      const [newBlog] = await tx
        .insert(blogs)
        .values({
          title: validatedData.data.title,
          description: validatedData.data.description,
          content: validatedData.data.content,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({ id: blogs.id });

      blogId = newBlog.id;

      // Process tags
      if (validatedData.data.tags.length > 0) {
        for (const tagName of validatedData.data.tags) {
          // Find or create tag
          let tagId: number;
          const existingTag = await tx
            .select()
            .from(blogTags)
            .where(eq(blogTags.name, tagName))
            .limit(1);

          if (existingTag.length > 0) {
            tagId = existingTag[0].id;
          } else {
            // Create new tag
            const [newTag] = await tx
              .insert(blogTags)
              .values({
                name: tagName,
                createdAt: new Date(),
                updatedAt: new Date(),
              })
              .returning({ id: blogTags.id });
            tagId = newTag.id;
          }

          // Create blog-tag relation
          await tx.insert(blogsToTags).values({
            blogId: blogId,
            tagId: tagId,
          });
        }
      }
    });

    return { success: true, blogId };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
} 