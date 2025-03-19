"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export const SkillsPaginationButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParamsNextPage = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentPage = params.get("skills_page") || "1";
      params.set("skills_page", (parseInt(currentPage) + 1).toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Button variant="colorful" onClick={setSearchParamsNextPage} disabled={isPending} size="lg">
      {isPending ? "Loading..." : "Load More"}
    </Button>
  );
};
