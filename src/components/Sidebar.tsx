import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={300}
            height={300}
            className="w-20 md:w-28 lg:w-36"
          />
          <button className="p-1.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <ul className="flex-1 px-3"></ul>
        <div className="border-t flex p-3"></div>
      </nav>
    </aside>
  );
}
