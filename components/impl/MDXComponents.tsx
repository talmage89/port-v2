import { Components } from "react-markdown";
import Image from "next/image";

export const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-2 text-2xl font-bold text-slate-950 sm:text-3xl dark:text-slate-50">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2 text-xl font-bold text-slate-950 sm:text-2xl dark:text-slate-50 [&:not(:first-child)]:mt-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 text-base font-bold text-slate-700 sm:text-lg dark:text-slate-200 [&:not(:first-child)]:mt-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-semibold text-slate-700 sm:text-base dark:text-slate-200 [&:not(:first-child)]:mt-2">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-200 [&:not(:first-child)]:mt-2">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-xs font-medium text-slate-600 sm:text-xs dark:text-slate-300 [&:not(:first-child)]:mt-2">
      {children}
    </h6>
  ),
  p: ({ children }) => <p className="mb-4 text-sm has-[strong]:mt-2 sm:text-base">{children}</p>,
  ul: ({ children }) => <ul className="mt-0 mb-4 list-disc space-y-1 pl-4 text-sm sm:pl-5 sm:text-base">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-4 text-sm sm:pl-5 sm:text-base">{children}</ol>,
  li: ({ children }) => <li className="text-sm sm:text-base [&>p]:mb-0 [&>p:not(:last-child)]:mb-1">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-700 transition-colors hover:text-indigo-600 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200"
      aria-label={`Open ${children}`}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-slate-700 dark:text-slate-200">{children}</strong>,
  em: ({ children }) => <em className="text-slate-700 italic dark:text-slate-200">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 rounded-sm border-l-4 border-indigo-300 bg-slate-50 py-2 pl-4 text-slate-700 italic dark:border-indigo-700 dark:bg-slate-800/50 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    // Inline code (no language specified)
    if (!className) {
      return (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200">
          {children}
        </code>
      );
    }

    // Code block with language
    return (
      <div className="my-4 overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {className.replace("language-", "")}
        </div>
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`${className} font-mono text-slate-800 dark:text-slate-200`}>{children}</code>
        </pre>
      </div>
    );
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) =>
    src?.startsWith("/") ? (
      <Image
        src={src}
        alt={alt ?? ""}
        className="mx-auto my-4 max-w-full rounded-md shadow-sm"
        width={1000}
        height={1000}
      />
    ) : (
      <img src={src} alt={alt ?? ""} className="mx-auto my-4 max-w-full rounded-md shadow-sm" />
    ),
  hr: () => <hr className="my-6 border-t border-slate-200 dark:border-slate-700" />,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 rounded-md border border-slate-200 dark:divide-slate-700 dark:border-slate-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-50 dark:bg-slate-800">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-slate-700 uppercase dark:text-slate-300">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{children}</td>,
  del: ({ children }) => <del className="text-slate-500 line-through dark:text-slate-400">{children}</del>,
  input: ({ checked, type }) =>
    type === "checkbox" ? (
      <input
        type="checkbox"
        readOnly
        checked={checked}
        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
      />
    ) : null,
};
