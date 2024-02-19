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
              src="/placeholder.png"
              width={200}
              height={200}
              alt="logo"
              className="w-48 md:w-64 lg:w-72"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
