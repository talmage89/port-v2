import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function SkillsAdminPage() {
  // Check authentication
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch skills grouped by category
  const skillsList = await db.select().from(skills).orderBy(asc(skills.category), asc(skills.order), asc(skills.name));

  // Group skills by category
  const skillsByCategory = skillsList.reduce(
    (acc, skill) => {
      const category = skill.category || "uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skillsList>,
  );

  // Sort categories for display
  const categories = Object.keys(skillsByCategory).sort();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your skills and categories</p>
        </div>
        <Link
          aria-label="Add Skill"
          href="/admin/skills/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Add Skill
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">No skills yet</p>
          <Link
            href="/admin/skills/new"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            aria-label="Add your first skill"
          >
            Add your first skill
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900 capitalize">{category}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {skillsByCategory[category].map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{skill.name}</h4>
                      {skill.description && <p className="mt-1 text-sm text-gray-500">{skill.description}</p>}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/skills/${skill.id}/edit`}
                        className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        aria-label="Edit Skill"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
