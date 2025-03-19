import { projectCaseStudies } from "@/db/schema";
import { db } from "@/db";

async function importCaseStudies() {
  try {
    console.log("🚀 Starting case studies import...");

    const caseStudiesData = [
      {
        projectId: 1,
        problem: "The problem",
        approach: "The approach",
        solution: "The solution",
        challenges: "The challenges",
        results: "The results",
      },
    ];
    const result = await db.insert(projectCaseStudies).values(caseStudiesData);

    console.log(`✅ Successfully imported ${caseStudiesData.length} case studies!`);
    return result;
  } catch (error) {
    console.error("❌ Error importing case studies:", error);
    throw error;
  }
}

importCaseStudies();
