import { Hero, About, Skills, SkillsSearchParams, FeaturedProjects, Contact } from "./sections";
import JsonLd from "@/components/JsonLd";
import { generateMetadata } from "@/lib/seo";

type SearchParamsType = SkillsSearchParams;

export const metadata = generateMetadata({
  title: "Talmage Bergeson | Full-stack Developer",
  description:
    "Self-taught developer turning ambitious ideas into reality through persistence, versatility, and continuous learning.",
});

export default async function Home({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
  const searchParamsObj = await searchParams;

  return (
    <>
      <JsonLd
        type="Person"
        data={{
          knowsAbout: [
            "Web Development",
            "Full-stack Development",
            "React",
            "Next.js",
            "TypeScript",
            "Python",
            "Django",
            "Tailwind CSS",
            "HTML",
            "CSS",
          ],
          sameAs: ["https://github.com/talmage89", "https://linkedin.com/in/talmage-bergeson"],
        }}
      />
      <JsonLd type="WebSite" />
      <div className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Skills searchParams={searchParamsObj} />
        <FeaturedProjects />
        <Contact />
      </div>
    </>
  );
}
