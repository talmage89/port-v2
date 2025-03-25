"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MDXEditor } from "@/components/impl/MDXEditor";
import { TagInput } from "@/components/impl/TagInput";
import { createBlog } from "./actions";

export default function NewBlogPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!blog.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!blog.content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const response = await createBlog({
        ...blog,
        tags,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to create blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("Error creating blog post");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof typeof blog, value: string) => {
    setBlog({
      ...blog,
      [field]: value,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Create New Blog Post</h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white p-6 shadow sm:rounded-md">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={blog.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="Blog post title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={blog.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="A brief description of your blog post"
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional: A short summary that will be displayed in the blog list
            </p>
          </div>

          {/* Content */}
          <MDXEditor
            id="content"
            label="Content"
            value={blog.content}
            onChange={(value) => handleChange("content", value)}
            placeholder="Write your blog post content here..."
            rows={12}
          />

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <TagInput
              tags={tags}
              onChange={setTags}
              placeholder="Add tags for your blog post..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Add tags to categorize your blog post (e.g., "Next.js", "React", "TypeScript")
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-blue-300"
          >
            {isSaving ? "Creating..." : "Create Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
} 