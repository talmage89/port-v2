import { Suspense } from "react";
import { SkillsSkeleton } from "./SkillsSkeleton";
import { SkillsGrid } from "./SkillsGrid";

export const SKILLS_PARAM = "skills_category";
export const SKILLS_PAGE_PARAM = "skills_page";

export const PAGE_SIZE = 8;

export type SkillsSearchParams = {
  skills_category?: string;
  skills_page?: string;
};

export const Skills = ({ searchParams }: { searchParams: SkillsSearchParams }) => {
  return (
    <section id="skills" className="bg-white py-16 md:py-32 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold md:text-4xl">My Skills</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <p className="mt-6 max-w-3xl text-center text-slate-600 dark:text-slate-400">
            My development toolkit has been built through both professional and personal experience. These are the
            technologies I've mastered so far, but I'm constantly expanding my capabilities. I select my tools carefully
            to ensure I can deliver solutions that are both effective today and adaptable for tomorrow.
          </p>
        </div>

        <Suspense fallback={<SkillsSkeleton />}>
          <SkillsGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};
