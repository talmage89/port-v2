"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FacetedFilter } from "@/components/ui/faceted-filter";

type FiltersProps = {
  options: string[];
  optionParam: string;
  pageParam?: string; // for deleting page if category is changed
};

export const Filters = ({ options, optionParam, pageParam }: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (option: string) => {
    const params = new URLSearchParams(searchParams);
    const currentOptions = params.get(optionParam)?.split(",") || [];
    if (currentOptions.includes(option)) {
      const updatedOptions = currentOptions.filter((opt) => opt !== option);
      updatedOptions.length ? params.set(optionParam, updatedOptions.join(",")) : params.delete(optionParam);
    } else {
      currentOptions.push(option);
      params.set(optionParam, currentOptions.join(","));
    }
    pageParam && params.delete(pageParam);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearOptions = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(optionParam);
    pageParam && params.delete(pageParam);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4">
      <FacetedFilter
        options={options.map((option) => ({
          label: option.charAt(0).toUpperCase() + option.slice(1),
          value: option,
        }))}
        facets={searchParams.get(optionParam)?.split(",") || []}
        onOptionSelect={(value) => setSearchParams(value)}
        onClearFilters={() => clearOptions()}
      />
    </div>
  );
};
