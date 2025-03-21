import { db } from "@/db";
import { projectCaseStudies, projectCaseStudiesTechnologies } from "@/db/schema/projects";
import { caseStudiesData } from "../data/caseStudiesData";
import { caseStudyTechnologiesData } from "../data/caseStudyTechnologiesData";
import { sql } from "drizzle-orm";

async function importCaseStudies() {
  // delete existing data

  let result;

  try {
    await db.delete(projectCaseStudies);
    await db.delete(projectCaseStudiesTechnologies);
    await db.execute(sql`ALTER SEQUENCE "project_case_studies_id_seq" RESTART WITH 1`);

    console.log("🚀 Starting case studies import...");
    result = await db.insert(projectCaseStudies).values(caseStudiesData);
    console.log(`✅ Successfully imported ${caseStudiesData.length} case studies!`);
  } catch (error) {
    console.error("❌ Error importing case studies:", error);
    throw error;
  }

  try {
    console.log("🚀 Starting case study technologies import...");
    const techResult = await db.insert(projectCaseStudiesTechnologies).values(caseStudyTechnologiesData);
    console.log(`✅ Successfully imported ${caseStudyTechnologiesData.length} case study technologies!`);

    return { caseStudies: result, technologies: techResult };
  } catch (error) {
    console.error("❌ Error importing case study technologies:", error);
    throw error;
  }
}

importCaseStudies();
