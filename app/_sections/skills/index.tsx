import { Suspense } from "react";
import { SkillsSkeleton } from "./SkillsSkeleton";
import { SkillsGrid } from "./SkillsGrid";

export const PAGE_SIZE = 12;
export const SKILLS_PARAM = "skills_category";
export const SKILLS_PAGE_PARAM = "skills_page";

export type SkillsSearchParams = {
  skills_category?: string;
  skills_page?: string;
};

export const Skills = ({ searchParams }: { searchParams: SkillsSearchParams }) => {
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
};
