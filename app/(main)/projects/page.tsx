import Link from "next/link";
import { Suspense } from "react";
import { Send } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { ProjectsSkeleton } from "./components/ProjectsSkeleton";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { TAGS_PARAM } from "./config";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

type ProjectsSearchParams = {
  [TAGS_PARAM]?: string;
};

export const metadata: Metadata = {
  title: "Projects | Talmage Bergeson",
  description: "Browse through my portfolio of projects built with various modern web technologies and frameworks.",
  openGraph: {
    title: "Projects | Talmage Bergeson",
    description: "Browse through my portfolio of projects built with various modern web technologies and frameworks.",
  }
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<ProjectsSearchParams> }) {
  const { [TAGS_PARAM]: tagsToFilterString } = await searchParams;
  const tagsToFilter = tagsToFilterString ? tagsToFilterString.split(",") : undefined;

  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "/projects",
      },
    ],
  };

  return (
    <>
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />
      <div className="bg-white py-16 md:py-32 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Projects</h1>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <p className="mt-6 max-w-3xl text-center text-gray-600 dark:text-gray-400">
              Here's a collection of my work. Browse through to see the various projects I've built and the technologies
              I've worked with.
            </p>
          </div>

          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectsGrid selectedTags={tagsToFilter} />
          </Suspense>

          <div className="mt-16 text-center">
            <Link
              href="/#contact"
              className={buttonVariants({ variant: "colorful", size: "lg" })}
              aria-label="Let's Work Together"
            >
              Let's Work Together
              <Send />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
