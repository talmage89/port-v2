import { ilike, or, count } from "drizzle-orm";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/impl";
import { SkillsPaginationButton } from "./SkillsPaginationButton";
import { SkillsSearchParams, PAGE_SIZE, SKILLS_PARAM, SKILLS_PAGE_PARAM } from "./index";

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
      <Filters
        options={categories.filter((c) => c !== null)}
        optionParam={SKILLS_PARAM}
        pageParam={SKILLS_PAGE_PARAM}
      />

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
          <SkillsPaginationButton />
        </div>
      )}
    </>
  );
}
