import { buttonVariants } from "@/components/ui/button";
import { ArrowDown, Code, Globe, Layers, Server, Sparkles, Terminal } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">
      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            I'm a full-stack developer with a knack for building intuitive, performant software.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="col-span-1 rounded-xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="mb-4 text-xl font-semibold">My Journey</h3>
              <p className="mb-8 text-slate-700 dark:text-slate-300">
                My path in tech began through intensive self-learning and a web development bootcamp. I first recognized
                how perfect programming was for me when I successfully built a portfolio site with a 3D user avatar with
                close to zero experience -- this was a challenge well beyond my initial skill level and it proved I
                could learn whatever was necessary to bring my vision to life.
              </p>
              <p className="mb-8 text-slate-700 dark:text-slate-300">
                Though I've been in the industry for under 3 years, I've already developed a reputation as a versatile
                problem-solver who thrives wearing multiple hats. My proudest achievement so far has been building a
                comprehensive e-commerce platform with Django and React that handles everything from payments to order
                fulfillment automation.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                What sets me apart is my combination of grit and humility. I push through obstacles relentlessly, but
                I'm also quick to recognize when my approach needs rethinking. While I don't have a traditional CS
                degree, I've turned this challenge into motivation to consistently demonstrate my value through
                exceptional work and continuous learning.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="mb-4 text-xl font-semibold">Personal Details</h3>
              <ul className="space-y-4">
                <li className="flex flex-wrap items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Name:</span>
                  <span className="ml-auto text-slate-700 dark:text-slate-300">Talmage Bergeson</span>
                </li>
                <li className="flex flex-wrap items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Location:</span>
                  <span className="ml-auto text-slate-700 dark:text-slate-300">Salt Lake City, Utah</span>
                </li>
                <li className="flex flex-wrap items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Email:</span>
                  <a
                    aria-label="Email"
                    href="mailto:talmage.bergeson@gmail.com"
                    className="ml-auto text-blue-600 hover:underline dark:text-blue-400"
                  >
                    talmage.bergeson@gmail.com
                  </a>
                </li>
                <li className="flex flex-wrap items-start">
                  <span className="w-24 font-medium text-slate-800 dark:text-slate-300">Status:</span>
                  <span className="ml-auto text-slate-700 dark:text-slate-300">Available for work</span>
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
                <div className="group rounded-lg border-1 border-transparent p-0 transition-all md:p-5 md:hover:border-slate-200 md:hover:bg-white/70 dark:md:hover:border-slate-800 dark:md:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/80 text-blue-600 transition-all dark:bg-blue-900/50 dark:text-blue-400">
                    <Layers size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">Clean Architecture</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Building clean, maintainable codebases with clear separation of concerns and modular design.
                  </p>
                </div>

                <div className="group rounded-lg border-1 border-transparent p-0 transition-all md:p-5 md:hover:border-slate-200 md:hover:bg-white/70 dark:md:hover:border-slate-800 dark:md:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100/80 text-purple-600 transition-all dark:bg-purple-900/50 dark:text-purple-400">
                    <Globe size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">Real-World Solutions</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Focusing on creating intuitive, accessible software that provides real value to users.
                  </p>
                </div>

                <div className="group rounded-lg border-1 border-transparent p-0 transition-all md:p-5 md:hover:border-slate-200 md:hover:bg-white/70 dark:md:hover:border-slate-800 dark:md:hover:bg-slate-800/70">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100/80 text-indigo-600 transition-all dark:bg-indigo-900/50 dark:text-indigo-400">
                    <Code size={22} />
                  </div>
                  <h4 className="mb-2 text-base font-medium">Continuous Learning</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Constantly learning and adapting to new technologies and best practices in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              aria-label="View Resume"
              href="/files/resume.pdf"
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
