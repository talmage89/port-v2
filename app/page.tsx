import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills, { SkillsSearchParams } from "@/components/sections/skills/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Contact from "@/components/sections/Contact";

type SearchParamsType = SkillsSearchParams;

export default async function Home({ searchParams }: { searchParams: SearchParamsType }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Skills searchParams={searchParams} />
      <FeaturedProjects />
      <Contact />
    </div>
  );
}
