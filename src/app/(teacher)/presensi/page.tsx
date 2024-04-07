"use client";

// next
import { useSession } from "next-auth/react";

// components
import SubjectForm from "./SubjectForm";

export default function Presensi() {
  const { data: session }: { data: any; status: string } = useSession();

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-lg">Presensi</h1>
        <h2>{session?.user?.fullname}</h2>
      </div>
      <div className="py-10">
        <SubjectForm />
      </div>
    </div>
  );
}
