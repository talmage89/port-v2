import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { projects, projectCaseStudies } from "@/db/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { Button } from "@/components/ui/button";

export default async function CaseStudiesAdminPage() {
  // Check authentication
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch case studies with associated project data
  const result = await db
    .select({
      caseStudy: projectCaseStudies,
      project: projects,
    })
    .from(projectCaseStudies)
    .leftJoin(projects, eq(projectCaseStudies.projectId, projects.id))
    .orderBy(desc(projectCaseStudies.createdAt));

  // Fetch projects without case studies
  const projectsWithoutCaseStudies = await db
    .select()
    .from(projects)
    .where(
      isNull(
        db
          .select({ id: projectCaseStudies.id })
          .from(projectCaseStudies)
          .where(eq(projectCaseStudies.projectId, projects.id))
          .limit(1),
      ),
    )
    .orderBy(desc(projects.createdAt));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Case Studies</h1>
          <p className="mt-1 text-sm text-gray-600">Manage detailed case studies for your projects</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Add Case Study
        </Link>
      </div>

      {result.length === 0 && projectsWithoutCaseStudies.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">No projects or case studies available</p>
          <Link href="/admin/projects/new" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Existing case studies */}
          {result.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Existing Case Studies</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.map(({ caseStudy, project }) => (
                  <div key={caseStudy.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                      <h3 className="text-lg font-medium text-gray-900">{project?.title || "Unknown Project"}</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 space-y-2">
                        {caseStudy.problem && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Problem:</span>{" "}
                            {caseStudy.problem.length > 100
                              ? `${caseStudy.problem.substring(0, 100)}...`
                              : caseStudy.problem}
                          </p>
                        )}
                        {caseStudy.solution && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Solution:</span>{" "}
                            {caseStudy.solution.length > 100
                              ? `${caseStudy.solution.substring(0, 100)}...`
                              : caseStudy.solution}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/admin/case-studies/${caseStudy.id}/edit`}
                          className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          Edit Case Study
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects without case studies */}
          {projectsWithoutCaseStudies.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Projects Without Case Studies</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectsWithoutCaseStudies.map((project) => (
                  <div key={project.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                      <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-4 text-sm text-gray-500">
                        {project.description
                          ? project.description.length > 100
                            ? `${project.description.substring(0, 100)}...`
                            : project.description
                          : "No description available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
