import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, error, ...props }: React.ComponentProps<"textarea"> & { error?: string }) {
  return (
    <>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
        )}
        {...props}
      />
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </>
  );
}

export { Textarea };
