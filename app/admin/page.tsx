import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SessionDebug from "./components/SessionDebug";

interface AdminCardProps {
  title: string;
  description: string;
  href: string;
}

function AdminCard({ title, description, href }: AdminCardProps) {
  return (
    <Link
      aria-label={`Manage ${title}`}
      href={href}
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">{title}</h5>
      <p className="text-gray-700">{description}</p>
      <div className="mt-4 text-sm text-blue-600 hover:underline">Manage &rarr;</div>
    </Link>
  );
}

export default async function AdminDashboard() {
  // Check authentication
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your portfolio content and view submissions</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="Form Submissions"
          description="View and manage form submissions"
          href="/admin/form-submissions"
        />
        <AdminCard title="Projects" description="Manage your portfolio projects" href="/admin/projects" />
        <AdminCard title="Skills" description="Manage your skills and categories" href="/admin/skills" />
        <AdminCard title="Case Studies" description="Manage project case studies" href="/admin/case-studies" />
      </div>

      {/* Add session debugger */}
      <SessionDebug />
    </div>
  );
}
