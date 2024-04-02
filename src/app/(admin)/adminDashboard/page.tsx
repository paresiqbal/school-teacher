"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();
  console.log(session);
  console.log(status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [router, session, session?.user.role, status]);

  return (
    <div className="text-center p-10 bg-muted/40">
      <h1 className="text-2xl">Welcome to Admin Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, non
        voluptates accusantium incidunt quasi optio reprehenderit rerum
        repellendus voluptatem laboriosam!
      </p>
    </div>
  );
}
