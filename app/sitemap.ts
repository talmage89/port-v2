import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const { db } = await import("@/db");

    // case studies

    const projects = await db.query.projects.findMany({
      columns: { id: true },
      with: {
        projectCaseStudies: { columns: { id: true } },
      },
    });

    const projectsWithCaseStudies = projects.filter(
      (project) => project.projectCaseStudies && project.projectCaseStudies.length > 0,
    );

    const projectRoutes: MetadataRoute.Sitemap = projectsWithCaseStudies.map((project) => ({
      url: `${siteConfig.url}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // blog posts

    const blogPosts = await db.query.blogs.findMany({
      columns: { id: true },
    });

    const blogPostRoutes: MetadataRoute.Sitemap = blogPosts.map((blogPost) => ({
      url: `${siteConfig.url}/blog/${blogPost.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogPostRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
