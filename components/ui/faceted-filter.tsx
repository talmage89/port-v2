"use client";

import * as React from "react";
import { Check, PlusCircle, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type FacetedFilterProps = {
  title?: string;
  facets: string[];
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onOptionSelect: (value: string) => void;
  onClearFilters: () => void;
};

export function FacetedFilter({ title, options, facets, onOptionSelect, onClearFilters }: FacetedFilterProps) {
  const [isPending, startTransition] = React.useTransition();

  const [search, setSearch] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
    setFilteredOptions(filteredOptions);
  }, [search]);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-auto max-w-full border-dashed hover:bg-white" aria-label="Filter">
            <SlidersHorizontal />
            {title}
            {facets?.length > 0 && (
              <>
                {/* <Separator orientation="vertical" className="ml-2 h-4" /> */}
                <div className="ml-2 flex flex-wrap items-center gap-2">
                  {options
                    .filter((option) => facets.includes(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className={cn("cursor-pointer py-0.75 pr-3 pl-2", isPending && "opacity-50")}
                        onMouseOver={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          startTransition(() => onOptionSelect(option.value));
                        }}
                      >
                        <X />
                        {option.label}
                      </Badge>
                    ))}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <form>
              <CommandInput
                placeholder={title}
                autoComplete="off"
                tabIndex={-1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <CommandList>
              {filteredOptions.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = facets.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => startTransition(() => onOptionSelect(option.value))}
                      className={cn("cursor-pointer", isPending && "opacity-50")}
                    >
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className="text-primary-foreground" />
                      </div>
                      {option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {facets.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => startTransition(() => onClearFilters())}
                      className={cn("cursor-pointer justify-center text-center", isPending && "opacity-50")}
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
