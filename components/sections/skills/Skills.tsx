import * as React from "react";
import { Suspense } from "react";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { ilike, or } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillsOptions } from "./SkillsOptions";
import { SkillsPagination } from "./SkillsPagination";
import { count } from "drizzle-orm";

const PAGE_SIZE = 12;

export type SkillsSearchParams = {
  skills_category?: string;
  skills_page?: string;
};

export default function Skills({ searchParams }: { searchParams: SkillsSearchParams }) {
  return (
    <section id="skills" className="bg-gradient-to-br from-white to-slate-50 py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold md:text-4xl">My Skills</h2>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            Every project I build relies on the right mix of technologies. These are the tools I've become proficient
            with so far, and I'm constantly adding new ones to my repertoire. I always strive to create clean, effective
            solutions that stand the test of time.
          </p>
        </div>

        <Suspense fallback={<SkillsSkeleton />}>
          <SkillsGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export async function SkillsSkeleton() {
  return (
    <>
      <SkillsOptions categories={[]} />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(PAGE_SIZE)].map((_, index) => (
          <Card key={index} className="animate-pulse border border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export async function SkillsGrid({ searchParams }: { searchParams?: SkillsSearchParams }) {
  const { skills_category, skills_page } = (await searchParams) || {};

  const skillsCategories = skills_category?.split(",") || [];
  const skillsPage = skills_page ? parseInt(skills_page) : 1;
  const itemsToShow = skillsPage * PAGE_SIZE;

  const getAllCategories = async () => {
    const categoriesResult = await db.selectDistinct({ category: skills.category }).from(skills);
    return categoriesResult.map((item) => item.category);
  };

  const getSkills = async (limit: number, categories?: string[]) => {
    const skills = await db.query.skills.findMany({
      where: (skills, { or, ilike }) =>
        categories?.length ? or(...categories.map((category) => ilike(skills.category, category))) : undefined,
      limit: limit,
    });
    return skills;
  };

  const getTotalCount = async (categories?: string[]) => {
    const result = await db
      .select({ count: count() })
      .from(skills)
      .where(categories?.length ? or(...categories.map((category) => ilike(skills.category, category))) : undefined);
    return result[0].count;
  };

  const categories = await getAllCategories();
  const skillsObjs = await getSkills(itemsToShow, skillsCategories);
  const totalCount = await getTotalCount(skillsCategories);
  const hasMore = itemsToShow < totalCount;

  const nextPageUrl = new URLSearchParams();
  if (skillsCategories.length) nextPageUrl.set("skills_category", skillsCategories.join(","));
  nextPageUrl.set("skills_page", (skillsPage + 1).toString());

  return (
    <>
      <SkillsOptions categories={categories.filter((c) => c !== null)} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {skillsObjs.map((skill) => (
          <Card key={skill.name}>
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
              {skill.category && (
                <CardDescription>{skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="container mx-auto flex justify-center py-8">
          <SkillsPagination />
        </div>
      )}
    </>
  );
}
