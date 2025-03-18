"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FacetedFilter } from "@/components/ui/faceted-filter";

type SkillsOptionsProps = {
  categories: string[];
};

export const SkillsOptions = ({ categories }: SkillsOptionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (category: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategories = params.get("skills_category")?.split(",") || [];
    if (currentCategories.includes(category)) {
      const updatedCategories = currentCategories.filter((cat) => cat !== category);
      updatedCategories.length
        ? params.set("skills_category", updatedCategories.join(","))
        : params.delete("skills_category");
    } else {
      currentCategories.push(category);
      params.set("skills_category", currentCategories.join(","));
    }
    params.delete("skills_page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearSkillsOptions = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("skills_category");
    params.delete("skills_page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4">
      <FacetedFilter
        options={categories.map((category) => ({
          label: category.charAt(0).toUpperCase() + category.slice(1),
          value: category,
        }))}
        facets={searchParams.get("skills_category")?.split(",") || []}
        onOptionSelect={(value) => setSearchParams(value)}
        onClearFilters={() => clearSkillsOptions()}
      />
    </div>
  );
};
