import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <section className="inset-0 flex min-h-[90vh] items-center justify-center bg-[url('/grid-pattern.svg')] bg-[length:60px_60px] bg-bottom dark:bg-[url('/grid-pattern-dark.svg')]">
      <div className="container mx-auto overflow-x-hidden px-4 py-16">
        <div className="relative mx-auto max-w-4xl">
          {/* Subtle gradient element - making these more diffuse */}
          <div className="absolute top-0 -right-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[60px] dark:from-blue-500/10 dark:to-purple-500/10"></div>
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[60px] dark:from-purple-500/10 dark:to-blue-500/10"></div>

          {/* Hero content */}
          <div className="relative z-10 space-y-6 text-center">
            <div className="animate-fade-in-up space-y-3">
              <HeroText />

              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400">
                Self-taught developer turning ambitious ideas into reality through persistence, versatility, and
                continuous learning.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/#projects"
                className={cn(
                  buttonVariants({ variant: "colorful", size: "lg" }),
                  "group relative overflow-hidden rounded-full px-8",
                )}
              >
                View my work
                <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/50",
                )}
              >
                Get in touch
              </Link>
            </div>

            <Link
              href="/#about"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-12 h-0 w-0 animate-bounce rounded-full p-6 shadow-lg",
              )}
            >
              <ArrowDown className="size-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
