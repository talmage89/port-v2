import { ilike, or, count } from "drizzle-orm";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/impl";
import { SkillsPaginationButton } from "./SkillsPaginationButton";
import { SkillsSearchParams, PAGE_SIZE, SKILLS_PARAM, SKILLS_PAGE_PARAM } from "./index";
import { Database, Layout, Server, Cpu, Workflow, Cloud, Sparkles } from "lucide-react";

const getSkillIcon = (category: string | null) => {
  switch (category?.toLowerCase()) {
    case "frontend":
      return (
        <div className="flex items-center justify-center rounded-full bg-yellow-50 p-3 dark:bg-yellow-900/30">
          <Layout className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
        </div>
      );
    case "backend":
      return (
        <div className="flex items-center justify-center rounded-full bg-purple-50 p-3 dark:bg-purple-900/30">
          <Server className="h-5 w-5 text-purple-500 dark:text-purple-300" />
        </div>
      );
    case "database":
      return (
        <div className="flex items-center justify-center rounded-full bg-teal-50 p-3 dark:bg-teal-900/30">
          <Database className="h-5 w-5 text-teal-500 dark:text-teal-300" />
        </div>
      );
    case "cloud":
      return (
        <div className="flex items-center justify-center rounded-full bg-pink-50 p-3 dark:bg-pink-900/30">
          <Cloud className="h-5 w-5 text-pink-500 dark:text-pink-300" />
        </div>
      );
    case "devops":
      return (
        <div className="flex items-center justify-center rounded-full bg-cyan-50 p-3 dark:bg-cyan-900/30">
          <Workflow className="h-5 w-5 text-cyan-500 dark:text-cyan-300" />
        </div>
      );
    case "ai":
      return (
        <div className="flex items-center justify-center rounded-full bg-lime-50 p-3 dark:bg-lime-900/30">
          <Sparkles className="h-5 w-5 text-lime-500 dark:text-lime-300" />
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center rounded-full bg-gray-50 p-3 dark:bg-gray-900/30">
          <Cpu className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </div>
      );
  }
};

export async function SkillsGrid({ searchParams }: { searchParams?: SkillsSearchParams }) {
  const { skills_category, skills_page } = searchParams || {};

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
      <Filters
        options={categories.filter((c) => c !== null)}
        optionParam={SKILLS_PARAM}
        pageParam={SKILLS_PAGE_PARAM}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skillsObjs.map((skill) => (
          <Card key={skill.name}>
            <CardHeader className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <CardTitle className="text-base">{skill.name}</CardTitle>
                {skill.category && (
                  <CardDescription>{skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</CardDescription>
                )}
              </div>
              {getSkillIcon(skill.category)}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="container mx-auto flex justify-center py-8">
          <SkillsPaginationButton />
        </div>
      )}
    </>
  );
}
