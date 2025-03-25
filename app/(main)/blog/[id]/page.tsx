import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { db } from "@/db";
import * as seo from "@/lib/seo";
import { MDX } from "@/components/impl/MDX";
import { Badge, buttonVariants } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

type BlogDetailPageProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const blogPost = await db.query.blogs.findFirst({
    where: (blogs, { eq }) => eq(blogs.id, id),
  });

  if (!blogPost) {
    return seo.generateMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    });
  }

  return seo.generateMetadata({
    title: `${blogPost.title} | Blog`,
    description: blogPost.description || `Read about ${blogPost.title}`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  const blogPost = await db.query.blogs.findFirst({
    where: (blogs, { eq }) => eq(blogs.id, id),
    with: { blogsToTags: { with: { tag: true } } },
  });

  if (!blogPost) {
    notFound();
  }

  const dateObj = new Date(blogPost.createdAt);

  const structuredData = {
    name: blogPost.title,
    description: blogPost.description,
    keywords: blogPost.blogsToTags.map(({ tag }) => tag.name),
    author: {
      "@type": "Person",
      name: "Talmage Bergeson",
    },
    datePublished: blogPost.createdAt?.toISOString(),
    url: `${seo.siteConfig.url}/blog/${id}`,
  };

  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogPost.title,
        item: `/blog/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />
      <JsonLd type="Article" data={structuredData} />
      <div className="bg-white py-16 md:py-24 dark:bg-slate-950">
        <div className="container mx-auto max-w-3xl px-4">
          <Link 
            href="/blog" 
            className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-8 gap-1" })}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User className="mr-1.5 h-3.5 w-3.5" />
                  <span>Talmage Bergeson</span>
                </div>
                <span className="text-gray-400">•</span>
                <time 
                  dateTime={dateObj.toISOString()} 
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  {dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{blogPost.title}</h1>

              {blogPost.description && (
                <p className="mb-6 text-lg text-gray-600 border-l-4 border-blue-500 pl-4 italic dark:text-gray-400">
                  {blogPost.description}
                </p>
              )}

              {blogPost.blogsToTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {blogPost.blogsToTags.map(({ tag }) => (
                    <Badge 
                      key={tag.id}
                      variant="secondary" 
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>
            </header>

            <div className="prose prose-blue max-w-none dark:prose-invert">
              <MDX content={blogPost.content} />
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link 
                href="/blog" 
                className={buttonVariants({ variant: "outline", className: "gap-1" })}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
