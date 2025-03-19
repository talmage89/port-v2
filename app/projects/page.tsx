import Link from "next/link";
import { Suspense } from "react";
import { Send } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { ProjectsSkeleton } from "./components/ProjectsSkeleton";
import { ProjectsGrid } from "./components/ProjectsGrid";

export const TAGS_PARAM = "projects_tags";

type ProjectsSearchParams = {
  [TAGS_PARAM]?: string;
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<ProjectsSearchParams> }) {
  const { [TAGS_PARAM]: tagsToFilterString } = await searchParams;
  const tagsToFilter = tagsToFilterString ? tagsToFilterString.split(",") : undefined;

  return (
    <div className="bg-white py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold md:text-3xl">My Projects</h1>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            Here's a collection of my work. Browse through to see the various projects I've built and the technologies
            I've worked with.
          </p>
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsGrid selectedTags={tagsToFilter} />
        </Suspense>

        <div className="mt-16 text-center">
          <Link href="/#contact" className={buttonVariants({ variant: "colorful", size: "lg" })}>
            Let's Work Together
            <Send />
          </Link>
        </div>
      </div>
    </div>
  );
}
