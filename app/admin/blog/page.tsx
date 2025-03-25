import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { blogs, blogTags, blogsToTags } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";

export default async function BlogAdminPage() {
  // Check authentication
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all blogs with their tags
  const blogPosts = await db.query.blogs.findMany({
    with: {
      blogsToTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(blogs.createdAt)],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your blog content</p>
        </div>
        <Link
          aria-label="Add Blog Post"
          href="/admin/blog/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Add Blog Post
        </Link>
      </div>

      {blogPosts.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">No blog posts available</p>
          <Link
            href="/admin/blog/new"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            aria-label="Create your first blog post"
          >
            Create your first blog post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900 truncate">{post.title}</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  {post.description ? (
                    <p className="text-sm text-gray-600">
                      {post.description.length > 120
                        ? `${post.description.substring(0, 120)}...`
                        : post.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No description</p>
                  )}
                </div>
                
                {post.blogsToTags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {post.blogsToTags.map(({ tag }) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <time className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <Link
                    aria-label="Edit Blog Post"
                    href={`/admin/blog/${post.id}/edit`}
                    className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    Edit Post
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 