import { buttonVariants } from "@/components/ui/button";
import { ArrowDown, Code, Globe, Layers, Server, Sparkles, Terminal } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">
      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            I'm a passionate full-stack developer creating elegant solutions to complex problems.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="col-span-1 rounded-xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="mb-4 text-xl font-semibold">My Journey</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                My path in technology began with curiosity about how things work, which evolved into a career building
                digital products that solve real-world problems. I combine technical expertise with an eye for design to
                create intuitive and performant applications.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                I'm always learning and exploring new technologies to expand my toolkit and enhance my ability to
                deliver exceptional solutions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="mb-4 text-xl font-semibold">Personal Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Name:</span>
                  <span className="text-slate-600 dark:text-slate-400">Talmage Bergeson</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Location:</span>
                  <span className="text-slate-600 dark:text-slate-400">Salt Lake City, Utah</span>
                </li>
                <li className="flex items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Email:</span>
                  <a
                    href="mailto:talmage.bergeson@gmail.com"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    talmage.bergeson@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Status:</span>
                  <span className="text-slate-600 dark:text-slate-400">Available for work</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Principles/approach - with enhanced styling */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm md:col-span-3 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
              {/* Accent shape */}
              <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-[30px] dark:from-blue-500/10 dark:to-purple-500/10"></div>

              <h3 className="relative z-10 mb-6 text-xl font-semibold">My Approach</h3>
              <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="group rounded-lg border-1 border-transparent p-5 transition-all hover:border-slate-200 hover:bg-white/70 dark:hover:border-slate-800 dark:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/80 text-blue-600 ring-4 ring-white/30 transition-all group-hover:ring-blue-500/20 dark:bg-blue-900/50 dark:text-blue-400 dark:ring-slate-950/30">
                    <Layers size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">Clean Architecture</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Building maintainable systems with clear separation of concerns and modular design.
                  </p>
                </div>

                <div className="group rounded-lg border-1 border-transparent p-5 transition-all hover:border-slate-200 hover:bg-white/70 dark:hover:border-slate-800 dark:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100/80 text-purple-600 ring-4 ring-white/30 transition-all group-hover:ring-purple-500/20 dark:bg-purple-900/50 dark:text-purple-400 dark:ring-slate-950/30">
                    <Globe size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">User-Centered</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Focusing on creating intuitive, accessible experiences that solve real user problems.
                  </p>
                </div>

                <div className="group rounded-lg border-1 border-transparent p-5 transition-all hover:border-slate-200 hover:bg-white/70 dark:hover:border-slate-800 dark:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100/80 text-indigo-600 ring-4 ring-white/30 transition-all group-hover:ring-indigo-500/20 dark:bg-indigo-900/50 dark:text-indigo-400 dark:ring-slate-950/30">
                    <Code size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">Continuous Learning</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Staying current with emerging technologies and best practices in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume button */}
          <div className="mt-12 flex justify-center">
            <a
              href="/resume.pdf"
              target="_blank"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "group relative",
              })}
            >
              <span className="relative z-10 flex items-center">
                View Resume
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 blur-md transition-opacity group-hover:opacity-100"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
