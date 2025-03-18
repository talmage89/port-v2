import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { ProjectCard } from "../projects/ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
};

const FeaturedProjects = () => {
  // Sample projects data - you would replace with your actual projects
  const projects: Project[] = [
    {
      id: "project1",
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with Next.js, Stripe, and a headless CMS. Features include product filtering, user accounts, and secure checkout.",
      tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
      imageUrl: "/beach_sunset.png",
      demoUrl: "https://example.com",
      codeUrl: "https://github.com/yourusername/project",
      caseStudyUrl: "/projects/e-commerce-platform",
    },
    {
      id: "project2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team workspace, and integration with popular productivity tools.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      imageUrl: "/beach_sunset.png",
      demoUrl: "https://example.com",
      codeUrl: "https://github.com/yourusername/project",
      caseStudyUrl: "/projects/task-management",
    },
    {
      id: "project3",
      title: "Personal Finance Dashboard",
      description:
        "An intuitive dashboard for tracking expenses, investments, and financial goals with data visualization and insights.",
      tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      imageUrl: "/beach_sunset.png",
      demoUrl: "https://example.com",
      caseStudyUrl: "/projects/finance-dashboard",
    },
  ];

  return (
    <section id="projects" className="bg-white py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
          <div className="mb-8 h-1 w-20 rounded bg-slate-900"></div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            Here are some of my recent projects. Each one solves a unique problem and demonstrates different aspects of
            my skills and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className={buttonVariants({ size: "lg", variant: "colorful" })}>
            View All Projects
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
