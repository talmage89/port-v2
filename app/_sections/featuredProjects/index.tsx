import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard, ProjectCardSkeleton } from "@/components/impl";

export const FeaturedProjects = () => {
  return (
    <section id="projects" className="bg-white py-16 md:py-32 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <p className="mt-6 max-w-3xl text-center text-slate-600 dark:text-slate-400">
            Here are some of my recent projects. Each one solves a unique problem and demonstrates different aspects of
            my skills and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={[...Array(3)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          >
            <FeaturedProjectsContent />
          </Suspense>
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className={buttonVariants({ size: "lg", variant: "default" })}>
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const FeaturedProjectsContent = async () => {
  const projectsData = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.featured, true),
    with: { projectsToProjectTags: { with: { tag: true } }, projectCaseStudies: true },
    limit: 3,
  });

  return projectsData.map((project) => <ProjectCard key={project.id} project={project} />);
};
