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
    <div className="max-w-[2000px] mx-auto">
      <NavigationMenu className="p-4">
        <div className="mx-auto flex items-center justify-between">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <a
            href="/teacher"
            aria-label="go to homepage"
            className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9 z-50"
          >
            <img
              src="/logo.png"
              alt="logo"
              width={200}
              className="w-20 md:w-64 lg:w-72"
            />
          </a>
        </div>
        <NavigationMenuList>
          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
