import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-slate-50 dark:from-black dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="transform transition-all duration-1000">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Turning complex problems into elegant solutions
              </span>
            </h1>
            <h2 className="mb-6 text-xl text-slate-700 md:text-3xl dark:text-slate-300">
              Full-Stack Software Developer
            </h2>
            <p className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-400">
              I build exceptional digital experiences with modern technologies. Specializing in creating elegant
              solutions to complex problems.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/#projects" className={cn(buttonVariants({ size: "lg" }), "")}>
                View My Work
              </Link>
              <Link href="/#contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "")}>
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="transform transition-all duration-1000">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              {/* Replace this with your actual profile image or illustration */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-3xl"></div>
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                {/* Placeholder for your image */}
                <div className="flex h-4/5 w-4/5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-7xl font-bold text-white">
                  TB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
