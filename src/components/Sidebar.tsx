"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-zinc-900 border-r shadow-md">
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
            {expanded ? <FaChevronRight /> : <FaChevronLeft />}
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
                  : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
              }`}
            >
              <MdDashboardCustomize />
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
                  : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
              }`}
            >
              <PiStudent />
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
                  : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
              }`}
            >
              <FaChalkboardTeacher />
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
                  : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
              }`}
            >
              <SiGoogleclassroom />
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
                    : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
                }`}
              >
                <IoCheckmarkDoneOutline />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-0" : "w-20 md:w-32 lg:w-40"
                  }`}
                >
                  Attendance
                </span>
              </div>
              {isDropdownOpen && (
                <div className="mt-1 bg-zinc-800 rounded-md shadow-lg">
                  <Link
                    href="/studentRecord"
                    className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                      pathname.startsWith("/studentRecord")
                        ? "bg-yellow-400 text-zinc-900"
                        : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
                    }`}
                  >
                    Student Record
                  </Link>
                  <Link
                    href="/teacherRecord"
                    className={`text-white flex items-center justify-center gap-2 rounded-md py-2 px-3 cursor-pointer transition-colors ${
                      pathname.startsWith("/teacherRecord")
                        ? "bg-yellow-400 text-zinc-900"
                        : "hover:bg-gradient-to-r from-yellow-400 to-sky-500"
                    }`}
                  >
                    Teacher Record
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
