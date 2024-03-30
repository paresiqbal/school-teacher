"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CircleUserRound,
  School,
  ListChecks,
  User,
} from "lucide-react";

// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-md">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className={`overflow-hidden transition-all ${
              expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
            }`}
          />
          <Button onClick={() => setExpanded((current) => !current)}>
            {expanded ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <ul className="flex-1 px-3">
          <li
            className={`relative flex flex-col gap-2 items-center my-1 font-medium text-lg`}
          >
            <Link
              href={"/dashboard"}
              className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                pathname === "/dashboard"
                  ? "bg-yellow-400 text-zinc-900"
                  : "hover:bg-yellow-500"
              }`}
            >
              <LayoutDashboard />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                }`}
              >
                Dashboard
              </span>
            </Link>
            <Link
              href="/student"
              className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                pathname === "/student"
                  ? "bg-yellow-400 text-zinc-900"
                  : "hover:bg-yellow-500"
              }`}
            >
              <GraduationCap />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                }`}
              >
                Student
              </span>
            </Link>
            <Link
              href="/teacher"
              className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                pathname === "/teacher"
                  ? "bg-yellow-400 text-zinc-900"
                  : "hover:bg-yellow-500"
              }`}
            >
              <CircleUserRound />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                }`}
              >
                Teacher
              </span>
            </Link>
            <Link
              href="/class"
              className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                pathname === "/class"
                  ? "bg-yellow-400 text-zinc-900"
                  : "hover:bg-yellow-500"
              }`}
            >
              <School />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                }`}
              >
                Class
              </span>
            </Link>
            <div>
              <div
                onClick={toggleDropdown}
                className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                  pathname.startsWith("/attendance")
                    ? "bg-yellow-400 text-zinc-900"
                    : "hover:bg-yellow-500"
                }`}
              >
                <ListChecks />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                  }`}
                >
                  Attendance
                </span>
              </div>
              {isDropdownOpen && (
                <div className="mt-1 rounded-md shadow-lg">
                  <Link
                    href="/studentRecord"
                    className={`text-white  flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                      pathname === "/studentRecord"
                        ? "bg-yellow-400 text-zinc-900"
                        : "hover:bg-yellow-500"
                    }`}
                  >
                    <User />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                      }`}
                    >
                      Student Record
                    </span>
                  </Link>
                  <Link
                    href="/teacherRecord"
                    className={`text-white text-base flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                      pathname === "/teacherRecord"
                        ? "bg-yellow-400 text-zinc-900"
                        : "hover:bg-yellow-500"
                    }`}
                  >
                    <User />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                      }`}
                    >
                      Teacher Record
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </li>
        </ul>

        <div className="border-t flex p-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </aside>
  );
}
