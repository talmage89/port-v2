"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LinkedIn, Twitter, Github } from "../ui/icons";
import { Mail, Pin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    try {
      // Here you would make an API call to send the form data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact form */}
          <Card className="col-span-1 lg:col-span-3">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Project Inquiry">Project Inquiry</SelectItem>
                      <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                      <SelectItem value="Collaboration">Collaboration</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    className="min-h-[100px]"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} variant="colorful" size="lg" className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <div className="mt-4 rounded-lg bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Your message has been sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-800 dark:bg-red-900 dark:text-red-200">
                    There was an error sending your message. Please try again later.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact info */}
          <div className="col-span-1 flex flex-col space-y-8 lg:col-span-2">
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
