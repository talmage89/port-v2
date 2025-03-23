import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function FormSubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  const submission = await db
    .select()
    .from(formSubmissions)
    .where(eq(formSubmissions.id, parseInt(id)))
    .then((res) => res[0]);

  if (!submission) {
    notFound();
  }

  const formattedDate = submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "Unknown";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Form Submission Details</h1>
        <Link
          aria-label="Back to All Submissions"
          href="/admin/form-submissions"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Back to All Submissions
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Request #{submission.id}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Submitted on {formattedDate}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{submission.name || "Not provided"}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{submission.email}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Reason</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {submission.reason || "Not specified"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Message</dt>
              <dd className="mt-1 text-sm whitespace-pre-wrap text-gray-900 sm:col-span-2 sm:mt-0">
                {submission.message}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
