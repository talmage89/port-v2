import { db } from "@/db";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui";
import { MDX } from "@/components/impl/MDX";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for each project page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projectId = parseInt(id);
  
  if (isNaN(projectId)) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
  
  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.id, projectId),
  });
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
  
  return {
    title: project.title,
    description: project.description || undefined,
    openGraph: {
      images: project.imageUrl ? [project.imageUrl] : [],
    },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.id, projectId),
    with: {
      projectCaseStudies: { with: { technologies: true } },
      projectsToProjectTags: { with: { tag: true } },
    },
  });

  if (!project || !project.projectCaseStudies?.length) {
    notFound();
  }

  const caseStudy = project.projectCaseStudies[0];
  const tags = project.projectsToProjectTags.map(relation => relation.tag.name);
  const technologies = caseStudy.technologies.map(tech => tech.name);

  // Create structured data for the project
  const projectStructuredData = {
    name: project.title,
    description: project.description,
    image: project.imageUrl,
    url: project.liveUrl || undefined,
    datePublished: project.createdAt?.toISOString(),
    keywords: [...tags, ...technologies],
    author: {
      "@type": "Person",
      name: "Talmage Bergeson",
    },
    codeRepository: project.codeUrl || undefined,
  };

  // Create breadcrumb structured data
  const breadcrumbStructuredData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteConfig.url}/projects/${projectId}`,
      },
    ],
  };

  return (
    <>
      <JsonLd type="Project" data={projectStructuredData} />
      <JsonLd type="BreadcrumbList" data={breadcrumbStructuredData} />
      <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/projects"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              aria-label="Back to Projects"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-8 grid grid-cols-1 items-center gap-6 sm:mb-12 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">{project.title}</h1>

              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                {project.projectsToProjectTags
                  .map((relation) => relation.tag)
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 sm:px-3 sm:py-1 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {tag.name}
                    </span>
                  ))}
              </div>

              <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-4">
                {project.liveUrl && (
                  <a
                    aria-label="View Site"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "sm:px-4 sm:py-2 sm:text-base",
                    })}
                  >
                    <ExternalLink size={16} className="mr-1.5 sm:mr-2" />
                    View Site
                  </a>
                )}

                {project.codeUrl && (
                  <a
                    aria-label="View Code"
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "sm:px-4 sm:py-2 sm:text-base",
                    })}
                  >
                    <Github size={16} className="mr-1.5 sm:mr-2" />
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Smaller Project Image */}
            {project.imageUrl && (
              <div className="mt-6 overflow-hidden rounded-xl shadow-md lg:col-span-1 lg:mt-0">
                <Image
                  priority
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
          <div className="mb-8 border-t border-slate-100 pt-8 sm:mb-12 sm:pt-12 dark:border-slate-800">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              {caseStudy.problem && (
                <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-sm sm:prose-base max-w-none">
                  <div className="text-slate-600 dark:text-slate-400">
                    <MDX content={caseStudy.problem} />
                  </div>
                </div>
              )}

              {caseStudy.approach && (
                <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-sm sm:prose-base max-w-none">
                  <div className="text-slate-600 dark:text-slate-400">
                    <MDX content={caseStudy.approach} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Solution and Technologies */}
          {caseStudy.solution && (
            <div className="mb-8 border-t border-slate-100 pt-8 sm:mb-12 sm:pt-12 dark:border-slate-800">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-sm sm:prose-base max-w-none md:col-span-2">
                  <div className="text-slate-600 dark:text-slate-400">
                    <MDX content={caseStudy.solution} />
                  </div>
                </div>

                {caseStudy.technologies.length > 0 && (
                  <div className="mt-6 md:mt-0">
                    <h3 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg md:text-right">Technologies Used</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:justify-end">
                      {caseStudy.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800 sm:px-3 sm:py-1.5 sm:text-sm dark:bg-slate-800 dark:text-slate-200"
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
          <div className="mb-8 border-t border-slate-100 pt-8 sm:mb-12 sm:pt-12 dark:border-slate-800">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              {caseStudy.challenges && (
                <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-sm sm:prose-base max-w-none">
                  <div className="text-slate-600 dark:text-slate-400">
                    <MDX content={caseStudy.challenges} />
                  </div>
                </div>
              )}

              {caseStudy.results && (
                <div className="prose dark:prose-invert prose-headings:font-bold prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-sm sm:prose-base max-w-none">
                  <div className="text-slate-600 dark:text-slate-400">
                    <MDX content={caseStudy.results} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back to Projects button */}
          <div className="border-t border-slate-100 pt-8 text-center sm:pt-12 dark:border-slate-800">
            <Link
              href="/projects"
              className={buttonVariants({ variant: "colorful", size: "default", className: "text-sm sm:text-base" })}
              aria-label="Back to All Projects"
            >
              <ArrowLeft size={16} className="mr-1.5 sm:mr-2" />
              Back to All Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
