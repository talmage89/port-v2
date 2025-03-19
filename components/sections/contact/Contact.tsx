import { Mail, Pin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { LinkedIn, Twitter, Github } from "@/components/ui/icons";
import { ContactForm } from "./ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="bg-gradient-to-br from-white to-slate-50 py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h2>
          <div className="mb-8 h-1 w-20 rounded bg-slate-900"></div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. Fill out the
            form below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="col-span-1 flex lg:col-span-3">
            <ContactForm />
          </div>

          <div className="col-span-1 flex flex-col space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Feel free to email me anytime</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="mr-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <a href="mailto:talmage.bergeson@gmail.com" className="text-blue-600 hover:underline">
                  talmage.bergeson@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Based in</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="mr-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Pin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p>Salt Lake City, UT</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-200 p-3 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    aria-label="GitHub"
                  >
                    <Github />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-200 p-3 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    aria-label="LinkedIn"
                  >
                    <LinkedIn />
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-200 p-3 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    aria-label="Twitter"
                  >
                    <Twitter />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
