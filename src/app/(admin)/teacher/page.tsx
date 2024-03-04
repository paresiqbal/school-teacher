// component
import Link from "next/link";
import TeacherRegister from "./TeacherRegister";

// shadcn
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Teacher {
  _id: number;
  username: string;
  fullname: string;
  nip: string;
  role: string;
}

async function getTeachersData(): Promise<Teacher[]> {
  const res = await fetch("http://localhost:3001/user/teachers", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function TeacherPage() {
  const teachers = await getTeachersData();
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Teacher management</h1>
        <p>create and manage teacher data</p>
      </div>
      <Card className="my-5 bg-card">
        <TeacherRegister />
      </Card>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">
                  {teacher.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {teacher.fullname}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Link href={`/teacher/${teacher._id}`}>Edit</Link>
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
