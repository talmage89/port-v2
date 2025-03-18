import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import { Send } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
};

export default function ProjectsPage() {
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
      featured: true,
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
      featured: true,
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
      featured: true,
    },
    {
      id: "project4",
      title: "Weather App",
      description:
        "A weather application that provides current conditions and forecasts for locations worldwide, with beautiful visualizations.",
      tags: ["React", "OpenWeather API", "Chart.js"],
      imageUrl: "/beach_sunset.png",
      demoUrl: "https://example.com",
      codeUrl: "https://github.com/yourusername/project",
      featured: false,
    },
    {
      id: "project5",
      title: "Recipe Finder",
      description:
        "Search and discover recipes based on ingredients you have, dietary restrictions, and cuisines. Includes meal planning functionality.",
      tags: ["JavaScript", "API Integration", "CSS Grid"],
      imageUrl: "/beach_sunset.png",
      demoUrl: "https://example.com",
      featured: false,
    },
    {
      id: "project6",
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies to showcase work and skills.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      imageUrl: "/beach_sunset.png",
      codeUrl: "https://github.com/yourusername/project",
      featured: false,
    },
  ];

  return (
    <div className="bg-white py-16 md:py-32 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">My Projects</h1>
          <div className="mb-8 h-1 w-20 rounded bg-slate-900"></div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400">
            Here's a collection of my work. Browse through to see the various projects I've built and the technologies
            I've worked with.
          </p>
        </div>

        {/* Project filters (optional) */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">All Projects</button>
          <button className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Web Apps
          </button>
          <button className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Mobile
          </button>
          <button className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Design
          </button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/#contact" className={buttonVariants({ variant: "colorful", size: "lg" })}>
            Let's Work Together
            <Send />
          </Link>
        </div>
      </div>
    </div>
  );
}
