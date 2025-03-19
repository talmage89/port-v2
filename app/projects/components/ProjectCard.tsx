import { type Project } from "@/db/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
      className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
        <CardDescription className="mt-2 flex flex-wrap gap-2">
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4 dark:border-gray-800">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span>Live Demo</span>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span>Code</span>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </a>
        )}
        {project.caseStudyUrl && (
          <a
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <span>Case Study</span>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
      <CardFooter className="mt-auto flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4 dark:border-gray-800">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-4 w-16" />
        ))}
      </CardFooter>
    </Card>
  );
};
