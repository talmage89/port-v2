import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";

export default async function ProjectsAdminPage() {
  // Check authentication
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch projects
  const projectList = await db.query.projects.findMany({
    orderBy: (projects, { asc, desc }) => [asc(projects.order), desc(projects.createdAt)],
    with: {
      projectCaseStudies: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your portfolio projects</p>
        </div>
        <Link
          aria-label="Add Project"
          href="/admin/projects/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Add Project
        </Link>
      </div>

      {projectList.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            aria-label="Create your first project"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              {project.imageUrl && (
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                  <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {project.description || "No description provided"}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  {project.featured && (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    aria-label="Edit Project"
                  >
                    Edit
                  </Link>
                  {project.projectCaseStudies?.length > 0 && (
                    <Link
                      href={`/admin/case-studies/${project.projectCaseStudies[0].id}/edit`}
                      className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100"
                      aria-label="Edit Case Study"
                    >
                      Case Study
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
