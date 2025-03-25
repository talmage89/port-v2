import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/db";
import { blogTags } from "@/db/schema";
import { generateMetadata } from "@/lib/seo";
import { Badge, buttonVariants } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BlogGrid } from "./components/BlogGrid";
import { BlogSkeleton } from "./components/BlogSkeleton";
import { TAGS_PARAM } from "./config";

export const metadata = generateMetadata({
  title: "Blog | Talmage Bergeson",
  description: "Thoughts, ideas, and insights on web development, technology, and more.",
});

type BlogSearchParams = {
  [TAGS_PARAM]?: string;
};

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
      name: "Blog",
      item: "/blog",
    },
  ],
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  const { [TAGS_PARAM]: tagsToFilterString } = await searchParams;
  const tagsToFilter = tagsToFilterString ? tagsToFilterString.split(",") : undefined;

  return (
    <>
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />
      <div className="bg-white py-16 md:py-24 dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-center text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Blog</h1>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <p className="mt-6 max-w-2xl text-center text-gray-600 dark:text-gray-400">
              Thoughts, ideas, and insights on web development, technology, and more.
            </p>
          </div>

          <Suspense fallback={<BlogSkeleton />}>
            <BlogGrid selectedTags={tagsToFilter} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
