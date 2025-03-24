import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div">;

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground w-full rounded-xl border shadow-sm dark:border-slate-800 dark:bg-slate-900/50",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 py-4 sm:gap-6 sm:py-6">{children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-header" className={cn("flex flex-col gap-1 px-4 sm:gap-1.5 sm:px-6", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("text-lg leading-none font-semibold sm:text-xl", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs sm:text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-4 sm:px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-4 sm:px-6", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
