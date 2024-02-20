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
              className="z-50 md:w-32 lg:w-40"
            >
              <img
                src="/logo.png"
                alt="logo"
                width={200}
                className="w-20 md:w-64 lg:w-72"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuList className="flex flex-col gap-4 absolute right-0 left-0 top-2">
            <NavigationMenuItem>
              <Link href="/teacher">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/attendance">Attendance</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/grade">Grade</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/schedule">Schedule</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/teacher/announcement">Announcement</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
