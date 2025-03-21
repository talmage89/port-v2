"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MDXEditor } from "@/components/impl/MDXEditor";
import { TagInput } from "@/components/impl/TagInput";
import { deleteCaseStudy, getCaseStudy, updateCaseStudy } from "./actions";

// Define the case study type
interface CaseStudy {
  id: number;
  projectId: number;
  problem: string | null;
  approach: string | null;
  solution: string | null;
  challenges: string | null;
  results: string | null;
}

// Define the project type
interface Project {
  id: number;
  title: string;
}

export default function EditCaseStudyPage({ params }: { params: React.Usable<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [technologies, setTechnologies] = useState<string[]>([]);

  // Fetch case study data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCaseStudy(parseInt(id));
        if (result.caseStudy) {
          setCaseStudy(result.caseStudy);
          setProject(result.project);
          setTechnologies(result.technologies || []);
        }
      } catch (err) {
        setError("Error loading case study");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseStudy) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await updateCaseStudy(parseInt(id), {
        ...caseStudy,
        technologies,
      });

      if (!response.success) {
        throw new Error("Failed to update case study");
      }

      router.push("/admin/case-studies");
      router.refresh();
    } catch (err) {
      setError("Error saving case study");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof CaseStudy, value: string) => {
    if (caseStudy) {
      setCaseStudy({
        ...caseStudy,
        [field]: value,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCaseStudy(parseInt(id));
      if (response.success) {
        router.push("/admin/case-studies");
        router.refresh();
      } else {
        setError(response.error || "Failed to delete case study");
      }
    } catch (err) {
      setError("Error deleting case study");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!caseStudy) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800">Case study not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-7 font-bold text-gray-900 sm:truncate sm:text-3xl">Edit Case Study</h2>
          {project && (
            <p className="mt-1 text-sm text-gray-500">
              For project: <span className="font-medium">{project.title}</span>
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6 bg-white p-6 shadow sm:rounded-md">
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
            onClick={() => handleDelete()}
            className="rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:bg-red-300"
          >
            Delete Case Study
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
