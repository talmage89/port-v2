import { type Project } from "@/db/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, Code } from "lucide-react";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export const ProjectCard = ({ project, priority }: ProjectCardProps) => {
  return (
    <Card
      key={project.id}
      className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {project.imageUrl && (
        <div className="relative -mt-4 h-48 w-full overflow-hidden sm:-mt-6">
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
          <Image
            src={project.imageUrl}
            alt={project.title}
            priority={priority}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <span className="absolute top-3 right-3 z-10 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow-md">
              Featured
            </span>
          )}
        </div>
      )}

      <CardHeader className="relative">
        {project.featured && !project.imageUrl && (
          <span className="absolute top-0 right-0 rounded-bl-md bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
            Featured
          </span>
        )}
        <CardTitle className="mb-2 text-xl font-bold">{project.title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2">
          {project.projectsToProjectTags
            .map((relation) => relation.tag)
            .map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag.name}
              </span>
            ))}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-800">
        {project.liveUrl && (
          <a
            aria-label="View Site"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span>View Site</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
        {project.codeUrl && (
          <a
            aria-label="View Code"
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span>Code</span>
            <Github className="ml-1 h-3 w-3" />
          </a>
        )}
        {project.projectCaseStudies.length > 0 && (
          <a
            aria-label="View Case Study"
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-xs font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span>Case Study</span>
            <Code className="ml-1 h-3 w-3" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image skeleton */}
      <div className="relative -mt-4 h-48 w-full overflow-hidden bg-slate-200 sm:-mt-6 dark:bg-slate-800">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <span className="mt-2 flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-20 rounded-lg" />
          ))}
        </span>
      </CardHeader>

      <CardContent className="flex-grow pb-2">
        <Skeleton className="mb-2 h-4 w-full rounded-lg" />
        <Skeleton className="mb-2 h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-800">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-4 w-16" />
        ))}
      </CardFooter>
    </Card>
  );
};
