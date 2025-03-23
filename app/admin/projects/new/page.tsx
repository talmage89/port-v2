"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllTags, createProject } from "./actions";
import { TagInput } from "@/components/impl/TagInput";

// Define the project type
interface Project {
  title: string;
  description: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  codeUrl: string | null;
  featured: boolean;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    imageUrl: "",
    liveUrl: "",
    codeUrl: "",
    featured: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = await getAllTags();
        if (result.success) {
          setAllTags(result.allTags || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError(null);

      const response = await createProject({ ...project, tags });

      if (!response.success) {
        throw new Error("Failed to create project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError("Error creating project");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Project, value: any) => {
    setProject({
      ...project,
      [field]: value,
    });
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Create New Project</h2>
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
              value={project.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={project.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={project.imageUrl || ""}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <TagInput tags={tags} availableTags={allTags} onChange={setTags} placeholder="Add technology tags..." />
          </div>

          {/* Live URL */}
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
              Live URL
            </label>
            <input
              type="text"
              id="liveUrl"
              value={project.liveUrl || ""}
              onChange={(e) => handleChange("liveUrl", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Code URL */}
          <div>
            <label htmlFor="codeUrl" className="block text-sm font-medium text-gray-700">
              Code URL
            </label>
            <input
              type="text"
              id="codeUrl"
              value={project.codeUrl || ""}
              onChange={(e) => handleChange("codeUrl", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={project.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Featured project (displayed prominently)
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            aria-label="Cancel"
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            aria-label="Create Project"
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-blue-300"
          >
            {isSaving ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
