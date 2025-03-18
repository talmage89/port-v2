"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-black/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Talmage Bergeson
        </Link>

        {/* Mobile menu button */}
        <button className="p-2 md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
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
        </button>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#about" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            About
          </Link>
          <Link href="/#skills" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            Skills
          </Link>
          <Link href="/#projects" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            Projects
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            All Projects
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="flex flex-col space-y-4 border-t border-gray-200 bg-white p-4 md:hidden dark:border-gray-800 dark:bg-black">
          <Link href="/#about" className="text-sm font-medium" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/#skills" className="text-sm font-medium" onClick={toggleMenu}>
            Skills
          </Link>
          <Link href="/#projects" className="text-sm font-medium" onClick={toggleMenu}>
            Projects
          </Link>
          <Link href="/projects" className="text-sm font-medium" onClick={toggleMenu}>
            All Projects
          </Link>
          <Link href="/#contact" className="text-sm font-medium" onClick={toggleMenu}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
