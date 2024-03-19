"use client";

import StudentList from "./StudentList";
import StudentRegister from "./StudentRegister";

// shadcn
import { Card } from "@/components/ui/card";

export default function StudentPage() {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Student management</h1>
        <p>create and manage student data</p>
      </div>
      <Card className="my-5 bg-card">
        <StudentRegister />
      </Card>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <StudentList />
      </Card>
    </div>
  );
}
