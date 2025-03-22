import { Mail, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { LinkedIn, Github } from "@/components/ui/icons";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <section id="contact" className="bg-white py-24 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <p className="mx-auto mt-6 max-w-2xl text-slate-600 dark:text-slate-400">
              Looking for a versatile developer for your team? I'm always open to new opportunities to contribute and
              grow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Ways to reach me directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                      <a
                        href="mailto:talmage.bergeson@gmail.com"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                      >
                        talmage.bergeson@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</p>
                      <p className="font-medium">Salt Lake City, UT</p>
                    </div>
                  </div>

                  {/* Social links */}
                </CardContent>
                <CardFooter className="flex grow">
                  <div className="grid grow gap-1 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">Connect with me</p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/talmage89"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/talmage-bergeson/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Availability card - updated background */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-center gap-4">
                    <div className="relative h-3 w-3 rounded-full bg-green-500 after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-green-500"></div>
                    <p className="font-medium text-green-600 dark:text-green-400">Currently available for work</p>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    I'm open to full-time positions and freelance opportunities. Let's build something amazing together.
                  </p>
                  <div className="mt-6 flex">
                    <a
                      href="/files/resume.pdf"
                      target="_blank"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View my resume
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
