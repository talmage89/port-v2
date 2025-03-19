import { db } from "@/db";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

const RichText = async ({ content }: { content: string }) => {
  if (!content) return null;
  return (
    <div className="flex flex-col gap-3">
      <MDXRemote
        source={content}
        components={{
          h2: ({ children }) => <h2 className="mt-2 text-2xl font-bold">{children}</h2>,
          h3: ({ children }) => (
            <h3 className="mt-2 text-lg font-bold text-slate-700 dark:text-slate-200">{children}</h3>
          ),
          p: ({ children }) => <p className="has-[strong]:mt-2">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
          li: ({ children }) => <li className="text-lg">{children}</li>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400">
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="text-slate-700 dark:text-slate-200">{children}</strong>,
        }}
      />
    </div>
  );
};

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.id, projectId),
    with: { projectsToProjectTags: { with: { tag: true } } },
  });

  const caseStudy = await db.query.projectCaseStudies.findFirst({
    where: (projectCaseStudies, { eq }) => eq(projectCaseStudies.projectId, projectId),
    with: { technologies: true },
  });

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-16 dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.projectsToProjectTags
                .map((relation) => relation.tag)
                .map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <ExternalLink size={16} className="mr-2" />
                  View Live Demo
                </a>
              )}

              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <Github size={16} className="mr-2" />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Smaller Project Image */}
          {project.imageUrl && (
            <div className="overflow-hidden rounded-xl shadow-md lg:col-span-1">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Problem and Approach */}
        <div className="mb-12 border-t border-slate-100 pt-12 dark:border-slate-800">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {caseStudy.problem && (
              <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <h2 className="mb-6 text-3xl font-bold">The Problem</h2>
                <div className="text-slate-600 dark:text-slate-400">
                  <RichText content={caseStudy.problem} />
                </div>
              </div>
            )}

            {caseStudy.approach && (
              <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <h2 className="mb-6 text-3xl font-bold">My Approach</h2>
                <div className="text-slate-600 dark:text-slate-400">
                  <RichText content={caseStudy.approach} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Solution and Technologies */}
        {caseStudy.solution && (
          <div className="mb-12 border-t border-slate-100 pt-12 dark:border-slate-800">
            <h2 className="mb-6 text-3xl font-bold">The Solution</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none md:col-span-2">
                <div className="text-slate-600 dark:text-slate-400">
                  <RichText content={caseStudy.solution} />
                </div>
              </div>

              {caseStudy.technologies.length > 0 && (
                <div>
                  <h3 className="mb-4 text-right text-lg font-bold">Technologies Used</h3>
                  <div className="flex flex-wrap justify-end gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Challenges and Results */}
        <div className="mb-12 border-t border-slate-100 pt-12 dark:border-slate-800">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {caseStudy.challenges && (
              <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <h2 className="mb-6 text-3xl font-bold">Challenges & Learnings</h2>
                <div className="text-slate-600 dark:text-slate-400">
                  <RichText content={caseStudy.challenges} />
                </div>
              </div>
            )}

            {caseStudy.results && (
              <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <h2 className="mb-6 text-3xl font-bold">Results & Impact</h2>
                <div className="text-slate-600 dark:text-slate-400">
                  <RichText content={caseStudy.results} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Projects button */}
        <div className="border-t border-slate-100 pt-12 text-center dark:border-slate-800">
          <Link href="/projects" className={buttonVariants({ variant: "colorful", size: "lg" })}>
            <ArrowLeft size={16} className="mr-2" />
            Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
