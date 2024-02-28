"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status }: { data: any; status: any } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && session?.user.role != "admin") {
      router.push("/login");
    }
  }, [router, session?.user.role, status]);

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl">Welcome to Admin Dashboard</h1>
    </div>
  );
}
