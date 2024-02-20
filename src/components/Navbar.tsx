"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the navbar visibility

  // Toggle function to open/close the navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-[2000px] mx-auto">
      <nav className="mx-auto p-4 bg-amber-400">
        <div className="mx-auto flex items-center gap-4">
          <button
            className="lg:hidden focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-amber-400 text-neutral-900 hover:text-neutral-600 transition-colors"
            onClick={toggleNavbar} // Attach the toggle function
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <Link href="/teacher">
            <img src="/logo.png" alt="logo" className="w-20 md:w-64 lg:w-72" />
          </Link>
          <div
            className={`lg:flex lg:items-center lg:gap-4 transform top-0 left-0 w-[70%] lg:w-auto bg-amber-400 fixed lg:static h-full lg:h-auto overflow-auto ease-in-out transition-all duration-300 z-30 ${
              isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* Close Button for Mobile View */}
            <button
              onClick={toggleNavbar} // Use the toggle function to close
              className="p-4 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-6 lg:p-0 lg:flex lg:items-center lg:gap-4">
              <Link
                href="/"
                className="block py-1 px-6 dark:text-neutral-900 focus:outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-amber-400 hover:text-neutral-600 transition-colors"
              >
                Home
              </Link>
              {/* Adjust the Link components as needed, removing <a> for cleaner JSX in desktop mode */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
