"use client";

// library
import { z } from "zod";

// shadcn

import { Separator } from "@/components/ui/separator";

interface Iid {
  id: string;
}

export default function StudentDetails({ params }: { params: Iid }) {
  return (
    <div className="p-10">
      <div className="pb-10">
        <h1 className="text-2xl font-bold tracking-tight">Setting</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set user preferences.
        </p>
        <Separator className="my-4" />
      </div>
    </div>
  );
}
