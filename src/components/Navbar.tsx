"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div className="max-w-[2000px] mx-auto p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mx-auto flex items-center justify-between">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link
              href="/teacher"
              aria-label="go to homepage"
              className="md:w-32 lg:w-40  lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9"
            >
              <img
                src="/logo.png"
                alt="logo"
                width={200}
                className="w-20 md:w-64 lg:w-72"
              />
            </Link>
          </NavigationMenuItem>
          <div className="flex flex-col gap-4 absolute left-0 right-0 top-4 p-6 bg-zinc-900 text-lg">
            <NavigationMenuItem>
              <Link href="/teacher">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/attendance">Attendance</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/grade">Grade</Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
