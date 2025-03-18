import { db } from "@/db";
import { projects } from "@/db/schema";

async function importProjects() {
  try {
    const projectsData = [
      {
        title: "E-Commerce Platform",
        description:
          "A modern e-commerce platform built with Next.js, Stripe, and a headless CMS. Features include product filtering, user accounts, and secure checkout.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        codeUrl: "https://github.com/yourusername/project",
        caseStudyUrl: "/projects/e-commerce-platform",
        featured: true,
        tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, team workspace, and integration with popular productivity tools.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        codeUrl: "https://github.com/yourusername/project",
        caseStudyUrl: "/projects/task-management",
        featured: true,
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      },
      {
        title: "Personal Finance Dashboard",
        description:
          "An intuitive dashboard for tracking expenses, investments, and financial goals with data visualization and insights.",
        imageUrl: "/beach_sunset.png",
        demoUrl: "https://example.com",
        caseStudyUrl: "/projects/finance-dashboard",
        featured: true,
        tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      },
    ];

    const result = await db.insert(projects).values(projectsData);

    console.log(`✅ Successfully imported ${projectsData.length} projects!`);
    return result;
  } catch (error) {
    console.error("❌ Error importing projects:", error);
    throw error;
  }
}

importProjects();
