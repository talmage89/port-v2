"use client";

import ReactMarkdown from "react-markdown";

// Client-side MDX renderer component
export const MDXClient = ({ content }: { content: string }) => {
  if (!content) return null;

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <ReactMarkdown
        components={{
          h2: ({ children }) => <h2 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">{children}</h2>,
          h3: ({ children }) => (
            <h3 className="mt-2 text-base font-bold text-slate-700 sm:text-lg dark:text-slate-200">{children}</h3>
          ),
          p: ({ children }) => <p className="text-sm has-[strong]:mt-2 sm:text-base">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-4 sm:pl-5">{children}</ul>,
          li: ({ children }) => <li className="text-sm sm:text-base">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-indigo-300"
              aria-label={`Open ${children}`}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="text-slate-700 dark:text-slate-200">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
