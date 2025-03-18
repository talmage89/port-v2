import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

export const Twitter = ({ className }: IconProps) => {
  return (
    <svg className={cn("h-5 w-5", className)} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184c-.899-.96-2.18-1.56-3.591-1.56-2.724 0-4.92 2.21-4.92 4.92 0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147-.424.74-.665 1.584-.665 2.5 0 1.71.87 3.213 2.188 4.096-.806-.026-1.566-.248-2.228-.616v.06c0 2.385 1.693 4.374 3.946 4.827-.413.111-.85.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.32-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
    </svg>
  );
};
