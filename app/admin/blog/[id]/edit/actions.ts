"use server";

import { getServerSession } from "next-auth";
import { db } from "@/db";
import { blogs, blogTags, blogsToTags } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).default([]),
});

export type BlogWithTags = {
  id: number;
  title: string;
  description: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
};

export async function getBlog(id: number): Promise<{
  success: boolean;
  blog?: BlogWithTags;
  error?: string;
}> {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    if (isNaN(id)) {
      return { success: false, error: "Invalid ID format" };
    }

    // Fetch blog with tags
    const blog = await db.query.blogs.findFirst({
      where: eq(blogs.id, id),
      with: {
        blogsToTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!blog) {
      return { success: false, error: "Blog post not found" };
    }

    // Transform to BlogWithTags format
    const blogWithTags: BlogWithTags = {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      tags: blog.blogsToTags.map(({ tag }) => tag.name),
    };

    return { success: true, blog: blogWithTags };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function updateBlog(id: number, data: any): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Parse and validate request body
    const validatedData = updateBlogSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, error: validatedData.error.message };
    }

    // Check if blog exists
    const existingBlog = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);

    if (existingBlog.length === 0) {
      return { success: false, error: "Blog post not found" };
    }

    // Update in a transaction
    await db.transaction(async (tx) => {
      // Update blog
      await tx
        .update(blogs)
        .set({
          title: validatedData.data.title,
          description: validatedData.data.description,
          content: validatedData.data.content,
          updatedAt: new Date(),
        })
        .where(eq(blogs.id, id));

      // Get existing tag relations to clean up
      await tx.delete(blogsToTags).where(eq(blogsToTags.blogId, id));

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
            blogId: id,
            tagId: tagId,
          });
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

export async function deleteBlog(id: number): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if blog exists
    const existingBlog = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);

    if (existingBlog.length === 0) {
      return { success: false, error: "Blog post not found" };
    }

    // Delete in a transaction
    await db.transaction(async (tx) => {
      // Delete blog-tag relations first
      await tx.delete(blogsToTags).where(eq(blogsToTags.blogId, id));
      
      // Delete blog post
      await tx.delete(blogs).where(eq(blogs.id, id));
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
} 