"use client";
// next
import { useRouter } from "next/navigation";

// shadcn
import { Button } from "@/components/ui/button";

export default function Student() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/admin/student/register")}>
        Add new student +
      </Button>
    </div>
  );
}
