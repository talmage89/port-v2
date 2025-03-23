import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HeroText } from "./HeroText";

export const Hero = () => {
  return (
    <section
      className="inset-0 flex min-h-[90svh] bg-[url('/grid-pattern.svg')] bg-[length:60px_60px] bg-bottom dark:bg-[url('/grid-pattern-dark.svg')]"
      aria-labelledby="hero-heading"
    >
      <div className="flex grow items-center justify-center self-stretch overflow-x-hidden">
        <div className="relative px-4 pt-8">
          <div className="absolute top-0 -right-50 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[60px] dark:from-blue-500/10 dark:to-purple-500/10"></div>
          <div className="absolute bottom-0 -left-30 h-60 w-60 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[60px] dark:from-purple-500/10 dark:to-blue-500/10"></div>
          <div className="relative z-10 space-y-6 text-center">
            <header className="animate-fade-in-up space-y-3">
              <h1 id="hero-heading" className="sr-only">
                Talmage Bergeson - Full-stack Developer
              </h1>
              <HeroText />

              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 dark:text-slate-300">
                Self-taught developer turning ambitious ideas into reality through persistence, versatility, and
                continuous learning.
              </p>
            </header>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Link
                aria-label="View My Work"
                href="/#projects"
                className={cn(
                  buttonVariants({ variant: "colorful", size: "lg" }),
                  "group relative overflow-hidden rounded-full px-8 text-xl font-bold tracking-tight",
                )}
              >
                View my work
                <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                aria-label="Get in Touch"
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
              aria-label="Scroll to About Me"
              href="/#about"
              className={cn(buttonVariants({ variant: "default" }), "mt-12 h-0 w-0 rounded-full p-6 shadow-lg")}
            >
              <ArrowDown className="size-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
