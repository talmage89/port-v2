import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const projects = await db.query.projects.findMany({
  //   columns: { id: true },
  //   with: {
  //     projectCaseStudies: { columns: { id: true } },
  //   },
  // });

  // const projectsWithCaseStudies = projects.filter(
  //   (project) => project.projectCaseStudies && project.projectCaseStudies.length > 0,
  // );

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

  // const projectRoutes: MetadataRoute.Sitemap = projectsWithCaseStudies.map((project) => ({
  //   url: `${siteConfig.url}/projects/${project.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

  // return [...staticRoutes, ...projectRoutes];
  return staticRoutes;
}
