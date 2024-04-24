"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TeacherDashboard() {
  const { data: session }: { data: any } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <div className="py-6">
        <h2>
          Wellcome {""}
          <span className="text-yellow-500 font-bold">
            {session?.user?.fullname}
          </span>
        </h2>
        <Button>
          <Link href={"/presensi"}>Mulai Presensi</Link>
        </Button>
      </div>
    </div>
  );
}
