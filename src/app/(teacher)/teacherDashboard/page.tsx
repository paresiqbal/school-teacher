"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  CheckCheck,
  BookUser,
  BookCheck,
  NotepadText,
  QrCode,
  MoreHorizontalIcon,
} from "lucide-react";

export default function TeacherDashboard() {
  const { data: session }: { data: any } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
      <div className="py-6">
        <h2 className="text-2xl font-semibold">Wellcome</h2>
        <p className="text-3xl font-extrabold text-yellow-500">
          {session?.user?.fullname}
        </p>
      </div>
      <div className="left-0 z-50 w-full shadow-lg dark:bg-gray-950 dark:text-gray-50">
        <div className="grid grid-cols-3 gap-8 p-4">
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="/presensi">
              <CheckCheck className="h-6 w-6" />
              <span className="text-xs mt-1">Presensi</span>
            </Link>
          </div>
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="#">
              <BookUser className="h-6 w-6" />
              <span className="text-xs mt-1">Siswa</span>
            </Link>
          </div>
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="#">
              <BookCheck className="h-6 w-6" />
              <span className="text-xs mt-1">Laporan</span>
            </Link>
          </div>
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="#">
              <NotepadText className="h-6 w-6" />
              <span className="text-xs mt-1">Nilai</span>
            </Link>
          </div>
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="#">
              <QrCode className="h-6 w-6" />
              <span className="text-xs mt-1">QR Code</span>
            </Link>
          </div>
          <div className="flex flex-col p-2 items-center justify-center active:bg-yellow-400 rounded-md">
            <Link className="group flex flex-col items-center" href="#">
              <MoreHorizontalIcon className="h-6 w-6" />
              <span className="text-xs mt-1">More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
