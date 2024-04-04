"use client";

import { useSession } from "next-auth/react";

export default function Presensi() {
  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(session);

  return (
    <div>
      <div>
        <h1>Presensi</h1>
        <h2>{session?.user?.fullname}</h2>
        <p>{session?.user?.id}</p>
      </div>
    </div>
  );
}
