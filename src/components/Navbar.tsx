// next
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="max-w-[2000px] mx-auto">
      <nav className="mx-auto p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href={"/teacher"}
            className="focus:outline-none focus-visible:ring-4 rounded-sm ring-offset-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9 z-50"
          >
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="logo"
              className="w-12 md:w-64 lg:w-72"
            />
          </Link>
          <button
            id="menu"
            className="lg:hidden focus:outline-none focus-visible:ring-4 rounded-sm ring-offset-4 "
          >
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
          <div className="flex flex-col gap-4 absolute right-0 left-0 top-16 bg-slate-800 text-center p-6">
            <Link href={"/teacher"} className="py-1 px-6">
              Home
            </Link>
            <Link href={"/teacher"} className="py-1 px-6">
              Students
            </Link>
            <Link href={"/teacher"} className="py-1 px-6">
              Setting
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
