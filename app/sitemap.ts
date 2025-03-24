import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { db } from "@/db";

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

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
