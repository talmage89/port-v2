import { type Project } from "@/db/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, Code } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card
      key={project.id}
      image={
        project.imageUrl
          ? {
              src: project.imageUrl,
              alt: project.title,
            }
          : undefined
      }
      className="group overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800"
    >
      <CardHeader className="relative">
        {project.featured && (
          <span className="absolute -right-1 -top-0 rounded-bl-md rounded-tr-md bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
            Featured
          </span>
        )}
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
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
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-800">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span>Live Demo</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span>Code</span>
            <Github className="ml-1 h-3 w-3" />
          </a>
        )}
        {project.caseStudyUrl && (
          <a
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
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
    <Card className="border border-slate-200/60 shadow-sm group transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800">
      <CardHeader>
        <Skeleton className="h-6 w-48 rounded-lg" />
        <span className="mt-2 flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-20 rounded-lg" />
          ))}
        </span>
      </CardHeader>
      <CardContent>
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
