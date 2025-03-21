"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSkill } from "./actions";

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
  name: string;
  category: SkillCategory;
  description: string | null;
  order: number;
}

export default function NewSkillPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skill, setSkill] = useState<Skill>({
    name: "",
    category: "other",
    description: "",
    order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setError(null);

      const response = await createSkill(skill);

      if (!response.success) {
        throw new Error("Failed to create skill");
      }

      router.push("/admin/skills");
      router.refresh();
    } catch (err) {
      setError("Error creating skill");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Skill, value: any) => {
    setSkill({
      ...skill,
      [field]: value,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Create New Skill</h2>
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Lower numbers display first</p>
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
            {isSaving ? "Creating..." : "Create Skill"}
          </button>
        </div>
      </form>
    </div>
  );
} 