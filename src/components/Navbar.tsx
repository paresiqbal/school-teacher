"use client";

// next
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

// shadcn
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// icons
import { MenuIcon } from "lucide-react";

export default function Component() {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center" href="#">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="w-32 h-auto"
        />
        <span className="sr-only">SMK Negeri 1 Rejang Lebong</span>
      </Link>
      <nav className="hidden items-center space-x-4 md:flex">
        <Link
          className="text-sm font-medium hover:underline hover:underline-offset-4"
          href="/teacherDashboard"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline hover:underline-offset-4"
          href="/presensi"
        >
          Presensi
        </Link>
        <Link
          className="text-sm font-medium hover:underline hover:underline-offset-4"
          href="/teacherStudent"
        >
          Siswa
        </Link>
        {status === "authenticated" ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          "loading"
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-white dark:bg-background transition-all duration-300 ease-in-out overflow-y-auto"
          side="left"
        >
          <div className="flex flex-col items-start justify-between py-4">
            <div className="space-y-2">
              <Link className="flex items-center" href="/teacherDashboard">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="w-32 h-auto"
                />
                <span className="sr-only">SMK Negeri 1 Rejang Lebong</span>
              </Link>
              <nav className="space-y-2">
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/teacherDashboard"
                >
                  Home
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/presensi"
                >
                  Presensi
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/teacherStudent"
                >
                  Siswa
                </Link>
              </nav>
            </div>
            <div className="space-x-4 w-full">
              {status === "authenticated" ? (
                <Button
                  className="flex w-full items-center py-2 text-lg"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              ) : (
                "loading"
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
