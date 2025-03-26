"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Search } from "lucide-react";
import { ChatDialog } from "./ChatDialog";

const navLinks = [
  { href: "/#skills", text: "Skills" },
  { href: "/projects", text: "Projects" },
  { href: "/blog", text: "Blog" },
  { href: "/#contact", text: "Contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function navLink(href: string, text: string, key: string) {
    return (
      <Link
        aria-label={text}
        href={href}
        className="relative text-sm font-medium text-slate-800 transition-all after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 hover:text-slate-900 hover:after:w-full dark:text-gray-300 dark:after:bg-gray-300 dark:hover:text-gray-100"
        key={key}
      >
        {text}
      </Link>
    );
  }

  function mobileNavLink(href: string, text: string, key: string) {
    return (
      <Link
        aria-label={text}
        href={href}
        className="text-sm font-medium transition-transform duration-200 hover:translate-x-1"
        onClick={toggleMenu}
        key={key}
      >
        {text}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight" aria-label="Home">
          Talmage Bergeson
        </Link>

        {/* Desktop navigation and theme toggle */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => navLink(link.href, link.text, index.toString()))}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-slate-800 transition-all hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search</span>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu">
            <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`fixed z-40 w-full transform border-y border-gray-200 bg-white/95 p-4 shadow-sm transition-all duration-300 ease-in-out md:hidden dark:border-gray-800 dark:bg-slate-950/95 ${isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link, index) => mobileNavLink(link.href, link.text, index.toString()))}
        </nav>
      </div>

      {/* Chat Dialog */}
      <ChatDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};
