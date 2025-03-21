import { Hero, About, Skills, SkillsSearchParams, FeaturedProjects, Contact } from "./_sections";

type SearchParamsType = SkillsSearchParams;

export default async function Home({ searchParams }: { searchParams: Promise<SearchParamsType> }) {
  const searchParamsObj = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Skills searchParams={searchParamsObj} />
      <FeaturedProjects />
      <Contact />
    </div>
  );
}
