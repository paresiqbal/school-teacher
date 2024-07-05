"use client";

import { useSession } from "next-auth/react";
import StudentsCard from "./StudentsCard";

export default function AdminDashboard() {
  const { data: session }: { data: any } = useSession();

  return (
    <div className="p-10 h-screen bg-background">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <h2 className="text-xl">
          asdasdad
          <span className="text-yellow-500 font-extrabold">
            {session?.user?.fullname}
          </span>
        </h2>
      </div>
      <div>
        <StudentsCard />
      </div>
    </div>
  );
}
