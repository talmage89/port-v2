"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavItemProps {
  href: string;
  label: string;
  current: boolean;
}

function NavItem({ href, label, current }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AdminNavigation() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Form Submissions", href: "/admin/form-submissions" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Skills", href: "/admin/skills" },
    { name: "Case Studies", href: "/admin/case-studies" },
  ];

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-lg font-bold">Admin Portal</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <NavItem
                    key={item.name}
                    href={item.href}
                    label={item.name}
                    current={pathname === item.href}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              href={item.href}
              label={item.name}
              current={pathname === item.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 