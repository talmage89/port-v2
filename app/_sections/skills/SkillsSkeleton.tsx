import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filters } from "@/components/impl";
import { SKILLS_PARAM, PAGE_SIZE } from "./index";

export async function SkillsSkeleton() {
  return (
    <>
      <Filters options={[]} optionParam={SKILLS_PARAM} />
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
