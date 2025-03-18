import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  image?: {
    src: string;
    alt: string;
  };
};

function Card({ className, children, image, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card text-card-foreground overflow-hidden rounded-xl border shadow-xs", className)}
      {...props}
    >
      {image && (
        <div className="relative h-48">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-6 py-6">{children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
