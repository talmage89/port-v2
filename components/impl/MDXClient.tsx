"use client";

import ReactMarkdown from "react-markdown";
import { components } from "./MDXComponents";

export const MDXClient = ({ content }: { content: string }) => {
  if (!content) return null;

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};
