"use client";

// next
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// icons
import { Home, BookUser, User, Blocks, BookCheck, LogOut } from "lucide-react";

// shadcn
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <aside className="fixed top-0 left-0 z-50 h-full w-64 shrink-0 border-r bg-background dark:border-primary-foreground dark:bg-background lg:static">
      <div className="flex h-full flex-col justify-between py-6 px-4">
        <div>
          <Link
            className="flex items-center gap-2 px-3 py-2"
            href="/adminDashboard"
          >
            <span className="text-lg font-semibold">Acme Inc</span>
          </Link>
          <nav className="mt-6 space-y-2">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50"
              href="/adminDashboard"
            >
              <Home className="h-6 w-6" />
              <span>Dashboard</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50"
              href="/student"
            >
              <BookUser className="h-6 w-6" />
              <span>Siswa</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50"
              href="/teacher"
            >
              <User className="h-6 w-6" />
              <span>Guru</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50"
              href="/class"
            >
              <Blocks className="h-6 w-6" />
              <span>Kelas</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50"
              href="/studentRecord"
            >
              <BookCheck className="h-6 w-6" />
              <span>Presensi Siswa</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 dark:text-gray-400 dark:hover:bg-muted dark:hover:text-gray-50">
            <p>{session?.user?.fullname}</p>
            <p>{session?.user?.role}</p>
          </div>
          {status === "authenticated" ? (
            <Button>
              <LogOut className="h-6 w-6" onClick={() => signOut()} />
              <span>Logout</span>
            </Button>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </aside>
  );
}
