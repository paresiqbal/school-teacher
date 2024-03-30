"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { status }: { status: any } = useSession();

  // Toggle function to open/close the navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-[2000px] mx-auto">
      <nav className="mx-auto py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={toggleNavbar}>
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
          <Link href={"/dashboard"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={300}
              height={300}
              className="w-20 md:w-28 lg:w-36"
            />
          </Link>

          <div
            className={`lg:flex lg:items-center lg:gap-4 transform top-0 left-0 w-[60%] lg:w-auto fixed lg:static h-full lg:h-auto overflow-auto ease-in-out transition-all duration-300 z-30 ${
              isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <button onClick={toggleNavbar} className="p-4 lg:hidden">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-6 lg:p-0 flex flex-col lg:flex-row gap-4 lg:items-center lg:gap-6">
              <Link
                href="/teacher"
                className="text-white lg:text-sm hover:text-gray-400 transition-colors"
              >
                Teacher
              </Link>
              <Link
                href="/student"
                className="text-white lg:text-sm hover:text-gray-400 transition-colors"
              >
                Student
              </Link>
              <Link
                href="/class"
                className="text-white lg:text-sm hover:text-gray-400 transition-colors"
              >
                Classes
              </Link>
            </div>
          </div>
        </div>
        <div>
          {status === "authenticated" ? (
            <button onClick={() => signOut()} className="text-white">
              Logout
            </button>
          ) : (
            <button onClick={() => signIn()} className="text-white">
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
