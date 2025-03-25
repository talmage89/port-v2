"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MDXEditor } from "@/components/impl/MDXEditor";
import { TagInput } from "@/components/impl/TagInput";
import { getBlog, updateBlog, deleteBlog, BlogWithTags } from "./actions";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<BlogWithTags | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBlog(parseInt(id));
        if (result.success && result.blog) {
          setBlog(result.blog);
          setTags(result.blog.tags || []);
        } else {
          setError(result.error || "Failed to load blog post");
        }
      } catch (err) {
        setError("Error loading blog post");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blog) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await updateBlog(parseInt(id), {
        ...blog,
        tags,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to update blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("Error saving blog post");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof BlogWithTags, value: any) => {
    if (blog) {
      setBlog({
        ...blog,
        [field]: value,
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await deleteBlog(parseInt(id));
      if (response.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(response.error || "Failed to delete blog post");
      }
    } catch (err) {
      setError("Error deleting blog post");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800">Blog post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Edit Blog Post</h2>
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
              value={blog.description || ""}
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
            value={blog.content || ""}
            onChange={(value) => handleChange("content", value)}
            placeholder="Write your blog post content here..."
            rows={12}
          />

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <TagInput tags={tags} onChange={setTags} placeholder="Add tags for your blog post..." />
            <p className="mt-1 text-xs text-gray-500">
              Add tags to categorize your blog post (e.g., "Next.js", "React", "TypeScript")
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:bg-red-300"
          >
            Delete Blog Post
          </button>
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
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
