import { db } from "@/db";
import { blogs, blogTags, blogsToTags } from "@/db/schema";
import { Filters } from "@/components/impl";
import { Badge, buttonVariants } from "@/components/ui";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import { TAGS_PARAM } from "../config";

type BlogGridProps = {
  selectedTags?: string[];
};

export const BlogGrid = async ({ selectedTags }: BlogGridProps) => {
  const getTags = async () => {
    const tags = await db.selectDistinct({ name: blogTags.name }).from(blogTags);
    return tags.map(({ name }) => name);
  };

  const getBlogs = async (tags?: string[]) => {
    const blogIds = tags
      ? (
          await db.query.blogTags.findMany({
            where: (blogTags, { inArray }) => inArray(blogTags.name, tags),
            with: { blogsToTags: true },
          })
        )
          .flatMap((tag) => tag.blogsToTags)
          .map((relation) => relation.blogId)
      : undefined;

    const blogPosts = await db.query.blogs.findMany({
      with: { blogsToTags: { with: { tag: true } } },
      where: blogIds ? (blogs, { inArray }) => inArray(blogs.id, blogIds) : undefined,
      orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
    });

    return blogPosts;
  };

  const tags = await getTags();
  const blogPosts = await getBlogs(selectedTags);

  return (
    <>
      <Filters options={tags} optionParam={TAGS_PARAM} />

      {blogPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
          <p className="text-muted-foreground">
            {selectedTags ? "No blog posts found with the selected filters." : "No blog posts yet. Check back soon!"}
          </p>
          {selectedTags && (
            <Link href="/blog" className={buttonVariants({ variant: "outline", size: "sm", className: "mt-4" })}>
              Clear filters
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const dateObj = new Date(post.createdAt);

            return (
              <article
                key={post.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-slate-900"
              >
                <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden">
                  <div className="absolute top-0 right-0 h-10 w-10 translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                <Link href={`/blog/${post.id}`} className="group flex flex-grow flex-col">
                  <h2 className="mb-3 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-blue-600 md:text-xl dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>

                  {post.description ? (
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{post.description}</p>
                  ) : (
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                      {post.content
                        .slice(0, 350)
                        .replace(/[#_*~`]/g, "")
                        .trim()}
                      ...
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="mb-4 flex flex-wrap gap-1">
                      {post.blogsToTags.map(({ tag }) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="bg-blue-50 text-xs text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>

                    <time dateTime={dateObj.toISOString()} className="text-muted-foreground flex items-center text-xs">
                      <Calendar className="mr-1.5 h-3 w-3" />
                      {dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
};
