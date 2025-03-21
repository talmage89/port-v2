"use client";

import { ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import AdminNavigation from "./components/AdminNavigation";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

// Component to conditionally render the navbar
function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Don't show navigation on login page or when loading
  const showNavigation = !isLoginPage && status === "authenticated";

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <AdminNavigation />}
      <div className={showNavigation ? "py-6" : ""}>
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
} 