"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TeacherDashboard() {
  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(session);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>{session?.user?.fullname}</h2>
      <p>{session?.user?.id}</p>
      <div>
        <Link href={"/presensi"}>Presensi</Link>
      </div>
    </div>
  );
}
