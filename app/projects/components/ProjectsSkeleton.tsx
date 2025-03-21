import { ProjectCardSkeleton, Filters } from "@/components/impl";
import { TAGS_PARAM } from "../config";

export const ProjectsSkeleton = () => {
  return (
    <>
      <Filters options={[]} optionParam={TAGS_PARAM} />
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};
