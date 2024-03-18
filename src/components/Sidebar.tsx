"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

// icons
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";

// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar({ active }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-zinc-900 border-r shadow-md">
        <div className="p-4 pb-2 mr-8 flex justify-between items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="w-20 md:w-24 lg:w-32"
          />
          <Button
            onClick={() => setExpanded((current) => !current)}
            variant="secondary"
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
        </div>

        <ul className="flex-1 px-3">
          <li
            className={`relative flex items-center py-2  px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
              active
                ? "bg-gradient-to-r from-yellow-200 to bg-yellow-400"
                : "hover:bg-yellow-50 hover:text-zinc-900"
            }`}
          >
            <Link
              href={"/dashboard"}
              className="text-white flex items-center justify-center gap-2"
            >
              <MdDashboardCustomize />
              <span className="w-52 ml-">Dashboard</span>
            </Link>
          </li>
        </ul>

        <div className="border-t flex p-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className={`flex justify-between items-center w-52 ml-3`}>
            <div className="leading-4 text-white">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs">johndoe@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
