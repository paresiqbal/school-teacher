"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
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
