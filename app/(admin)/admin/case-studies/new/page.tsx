"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MDXEditor } from "@/components/impl/MDXEditor";
import { TagInput } from "@/components/impl/TagInput";
import { getProjects, createCaseStudy } from "./actions";

// Define the case study type
interface CaseStudy {
  projectId: number;
  problem: string | null;
  approach: string | null;
  solution: string | null;
  challenges: string | null;
  results: string | null;
}

// Define the project type for the dropdown
interface Project {
  id: number;
  title: string;
}

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [caseStudy, setCaseStudy] = useState<CaseStudy>({
    projectId: 0,
    problem: "",
    approach: "",
    solution: "",
    challenges: "",
    results: "",
  });
  const [technologies, setTechnologies] = useState<string[]>([]);

  // Fetch available projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        if (result.success && result.projects && result.projects.length > 0) {
          setProjects(result.projects || []);
          // Set the first project as the default selected project
          setCaseStudy((prev) => ({ ...prev, projectId: result.projects[0].id }));
        }
      } catch (err) {
        setError("Error loading projects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate project selection
    if (caseStudy.projectId === 0) {
      setError("Please select a project");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const response = await createCaseStudy({
        ...caseStudy,
        technologies,
      });

      if (!response.success) {
        throw new Error("Failed to create case study");
      }

      router.push("/admin/case-studies");
      router.refresh();
    } catch (err) {
      setError("Error creating case study");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof CaseStudy, value: any) => {
    setCaseStudy({
      ...caseStudy,
      [field]: value,
    });
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-yellow-50 p-4">
          <p className="text-yellow-800">
            No projects found. Please create a project first before creating a case study.
          </p>
          <button
            onClick={() => router.push("/admin/projects/new")}
            className="mt-2 rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 hover:bg-yellow-200"
          >
            Create Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Create New Case Study</h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white p-6 shadow sm:rounded-md">
          {/* Project Selection */}
          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              id="projectId"
              value={caseStudy.projectId}
              onChange={(e) => handleChange("projectId", parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="0" disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* Problem */}
          <MDXEditor
            id="problem"
            label="Problem"
            value={caseStudy.problem || ""}
            onChange={(value) => handleChange("problem", value)}
            placeholder="Describe the problem the project addressed..."
            rows={6}
          />

          {/* Approach */}
          <MDXEditor
            id="approach"
            label="Approach"
            value={caseStudy.approach || ""}
            onChange={(value) => handleChange("approach", value)}
            placeholder="Describe your approach to solving the problem..."
            rows={6}
          />

          {/* Solution */}
          <MDXEditor
            id="solution"
            label="Solution"
            value={caseStudy.solution || ""}
            onChange={(value) => handleChange("solution", value)}
            placeholder="Describe the solution implemented..."
            rows={6}
          />

          {/* Challenges */}
          <MDXEditor
            id="challenges"
            label="Challenges"
            value={caseStudy.challenges || ""}
            onChange={(value) => handleChange("challenges", value)}
            placeholder="Describe any challenges faced during the project..."
            rows={6}
          />

          {/* Results */}
          <MDXEditor
            id="results"
            label="Results"
            value={caseStudy.results || ""}
            onChange={(value) => handleChange("results", value)}
            placeholder="Describe the outcomes and results of the project..."
            rows={6}
          />

          {/* Technologies */}
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
              Technologies Used
            </label>
            <TagInput
              tags={technologies}
              onChange={setTechnologies}
              placeholder="Add technologies used in this project..."
            />
            <p className="mt-1 text-xs text-gray-500">Add all technologies and tools used in this project</p>
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
            {isSaving ? "Creating..." : "Create Case Study"}
          </button>
        </div>
      </form>
    </div>
  );
}
