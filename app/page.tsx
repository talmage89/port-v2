import { Hero, About, Skills, SkillsSearchParams, FeaturedProjects, Contact } from "./_sections";

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
