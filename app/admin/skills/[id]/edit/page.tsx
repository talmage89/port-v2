"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteSkill, getSkill, updateSkill } from "./actions";

// Define the skill categories
type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "devops"
  | "testing"
  | "framework"
  | "mobile"
  | "design"
  | "AI"
  | "other";

// Define the skill type
interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  description: string | null;
  order: number;
}

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skill, setSkill] = useState<Skill | null>(null);

  // Fetch skill data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSkill(parseInt(id));
        if (result.skill) {
          // Ensure category and order are cast to the correct types
          setSkill({
            ...result.skill,
            category: (result.skill.category || "other") as SkillCategory,
            order: result.skill.order ?? 0, // Default to 0 if null
          });
        }
      } catch (err) {
        setError("Error loading skill");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skill) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await updateSkill(parseInt(id), skill);

      if (!response.success) {
        throw new Error("Failed to update skill");
      }

      router.push("/admin/skills");
      router.refresh();
    } catch (err) {
      setError("Error saving skill");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Skill, value: any) => {
    if (skill) {
      setSkill({
        ...skill,
        [field]: value,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteSkill(parseInt(id));
      if (response.success) {
        router.push("/admin/skills");
        router.refresh();
      } else {
        setError(response.error || "Failed to delete skill");
      }
    } catch (err) {
      setError("Error deleting skill");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!skill) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800">Skill not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Edit Skill</h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white p-6 shadow sm:rounded-md">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={skill.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={skill.category}
              onChange={(e) => handleChange("category", e.target.value as SkillCategory)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="cloud">Cloud</option>
              <option value="devops">DevOps</option>
              <option value="testing">Testing</option>
              <option value="framework">Framework</option>
              <option value="mobile">Mobile</option>
              <option value="design">Design</option>
              <option value="AI">AI</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={skill.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          {/* Order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              value={skill.order}
              onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">Lower numbers display first</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            aria-label="Delete Skill"
            type="button"
            onClick={() => handleDelete()}
            className="rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:bg-red-300"
          >
            Delete Skill
          </button>
          <button
            aria-label="Cancel"
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            aria-label="Save Changes"
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
