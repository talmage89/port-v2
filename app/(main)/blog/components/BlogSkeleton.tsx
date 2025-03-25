import { Filters } from "@/components/impl/Filters";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <>
      <Filters options={[]} optionParam="" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-slate-900"
          >
            <Skeleton className="mb-3 h-7 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="mt-auto flex flex-wrap gap-1 pt-4">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
