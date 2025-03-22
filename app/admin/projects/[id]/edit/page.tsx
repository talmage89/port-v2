"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProject, updateProject, deleteProject } from "./actions";
import { TagInput } from "@/components/impl/TagInput";

// Define the project type
interface Project {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  codeUrl: string | null;
  featured: boolean;
  order: string;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch project data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProject(parseInt(id));
        if (result.project) {
          // Ensure proper type casting for the Project interface
          setProject({
            id: result.project.id,
            title: result.project.title,
            description: result.project.description,
            imageUrl: result.project.imageUrl,
            liveUrl: result.project.liveUrl,
            codeUrl: result.project.codeUrl,
            featured: result.project.featured ?? false, // Default to false if null
            order: result.project.order?.toString() ?? "0", // Default to 0 if null
          });
          setTags(result.tags || []);
          setAllTags(result.allTags || []);
        }
      } catch (err) {
        setError("Error loading project");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await updateProject(parseInt(id), { ...project, tags, order: parseInt(project.order) });

      if (!response.success) {
        throw new Error("Failed to update project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError("Error saving project");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProject(parseInt(id));
      if (response.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(response.error || "Failed to delete project");
      }
    } catch (err) {
      setError("Error deleting project");
      console.error(err);
    }
  };

  const handleChange = (field: keyof Project, value: any) => {
    if (project) {
      setProject({
        ...project,
        [field]: value,
      });
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Edit Project</h2>
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

          {/* Order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
              Order
            </label>
            <input
              type="number"
              id="order"
              value={project.order}
              onChange={(e) => handleChange("order", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => handleDelete()}
            className="rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:bg-red-300"
          >
            Delete Project
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
