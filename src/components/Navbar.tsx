"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-[2000px] mx-auto">
      <nav className="border-b border-stone-300 py-4 px-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/teacher" className="text-gray-900 dark:text-white">
            SMKN 1 RL
          </Link>
          <Link
            href="/students"
            className="text-gray-900 dark:text-white hidden lg:block"
          >
            Dashboard
          </Link>
          <Link
            href="/students"
            className="text-gray-900 dark:text-white hidden lg:block"
          >
            Students
          </Link>
          <Link
            href="/settings"
            className="text-gray-900 dark:text-white hidden lg:block"
          >
            Settings
          </Link>
        </div>

        <div className="flex items-center">
          <button className="text-gray-900 dark:text-white hidden lg:block">
            Logout
          </button>
          <button
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none focus-visible:ring-2 ring-stone-200"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`lg:hidden ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } absolute right-0 left-0 top-16 bg-[--primary] text-center p-6 text-lg transition-transform duration-300 ease-out flex flex-col items-center`}
        >
          <Link href="/dashboard" className="py-1 px-6 text-white my-2">
            Dashboard
          </Link>
          <Link href="/students" className="py-1 px-6 text-white my-2">
            Students
          </Link>
          <Link href="/settings" className="py-1 px-6 text-white my-2">
            Settings
          </Link>
          <button className="text-white my-2">Logout</button>
        </div>
      </nav>
    </div>
  );
}
