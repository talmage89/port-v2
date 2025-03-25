import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "./MDXComponents";

export const MDX = async ({ content }: { content: string }) => {
  if (!content) return null;

  return (
    <div className="relative flex flex-col gap-2 sm:gap-3">
      <MDXRemote source={content} components={components} />
    </div>
  );
};
