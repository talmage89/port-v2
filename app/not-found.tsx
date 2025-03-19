export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-white dark:bg-slate-950">
      <div className="px-4 text-center">
        <h1 className="mb-6 text-6xl font-light text-slate-900 dark:text-white">404</h1>
        <p className="mb-10 text-slate-600 dark:text-slate-400">
          Page not found
        </p>
        <a
          href="/"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          Return home
        </a>
      </div>
    </div>
  );
}
