import { db } from "@/db";
import { skills } from "@/db/schema";
import { skillsData } from "../data/skillsData";

async function importSkills() {
  try {
    console.log("🚀 Starting skills import...");
    const result = await db.insert(skills).values(skillsData);
    console.log(`✅ Successfully imported ${skillsData.length} skills!`);
    return result;
  } catch (error) {
    console.error("❌ Error importing skills:", error);
    throw error;
  }
}

importSkills();
