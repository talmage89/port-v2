import { skills } from "@/db/schema";
import { db } from "@/db";

async function importSkills() {
  try {
    console.log("🚀 Starting skills import...");

    const skillsData: (typeof skills.$inferInsert)[] = [
      {
        name: "React",
        category: "frontend",
        description: "I'm a React developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "TypeScript",
        category: "frontend",
        description: "I'm a TypeScript developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Next.js",
        category: "frontend",
        description: "I'm a Next.js developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "CSS/SCSS",
        category: "frontend",
        description: "I'm a CSS/SCSS developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        description:
          "I'm a Tailwind CSS developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "JavaScript",
        category: "frontend",
        description: "I'm a JavaScript developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Node.js",
        category: "backend",
        description: "I'm a Node.js developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Express",
        category: "backend",
        description: "I'm a Express developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "MongoDB",
        category: "database", // Changed from "backend" to match enum
        description: "I'm a MongoDB developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "PostgreSQL",
        category: "database", // Changed from "backend" to match enum
        description: "I'm a PostgreSQL developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "GraphQL",
        category: "backend",
        description: "I'm a GraphQL developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Figma",
        category: "other", // Changed from "design" to match enum
        description: "I'm a Figma developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "UI/UX Design",
        category: "other", // Changed from "design" to match enum
        description:
          "I'm a UI/UX Design developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Git & GitHub",
        category: "other", // Changed from "tools" to match enum
        description:
          "I'm a Git & GitHub developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "Docker",
        category: "other", // Changed from "tools" to match enum
        description: "I'm a Docker developer with a passion for building scalable and efficient web applications.",
      },
      {
        name: "AWS",
        category: "cloud", // Changed from "tools" to match enum
        description: "I'm a AWS developer with a passion for building scalable and efficient web applications.",
      },
    ];

    const result = await db.insert(skills).values(skillsData);

    console.log(`✅ Successfully imported ${skillsData.length} skills!`);
    return result;
  } catch (error) {
    console.error("❌ Error importing skills:", error);
    throw error;
  }
}

importSkills();
