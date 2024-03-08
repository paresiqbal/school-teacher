// next
import Link from "next/link";

import StudentRegister from "./StudentRegister";

// shadcn
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  _id: number;
  username: string;
  fullname: string;
  class: string;
}

async function getStudentsData(): Promise<Student[]> {
  const res = await fetch("http://localhost:3001/student/students", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function StudentPage() {
  const students = await getStudentsData();

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
        {students.map((student) => (
          <div key={student._id} className="flex justify-between py-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">
                  {student.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.fullname}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Link href={`/student/${student._id}`}>Edit</Link>
              </Button>
              <Button variant="destructive">
                <Link href={"#"}>Delete</Link>
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
