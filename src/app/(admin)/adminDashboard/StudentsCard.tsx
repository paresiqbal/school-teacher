// next
import { useState, useEffect } from "react";

// shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// icons
import { BookUser, User } from "lucide-react";

interface IClassInfo {
  _id: string;
  level: string;
  majorName: string;
}

interface IStudent {
  _id: string;
  username: string;
  fullname: string;
  class: IClassInfo;
}

interface ITeacher {
  _id: string;
  username: string;
  fullname: string;
  nip: number;
  role: string;
}

async function getStudentsData(): Promise<IStudent[]> {
  const res = await fetch("https://express.smkn1rl.sch.id/student/students", {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}

async function getTeachersData(): Promise<ITeacher[]> {
  const res = await fetch("https://express.smkn1rl.sch.id/user/teachers", {
    cache: "no-store",
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}

export default function StudentsCard() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    getStudentsData().then(setStudents);
    getTeachersData().then(setTeachers);
  }, []);

  const totalByLevel = (level: string) =>
    students.filter((student) => student.class.level === level).length;

  return (
    <div className="flex justify-between py-4 gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Siswa Kelas X</CardTitle>
          <BookUser />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totalByLevel("X")}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Siswa Kelas XI</CardTitle>
          <BookUser />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totalByLevel("XI")}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Siswa Kelas XII</CardTitle>
          <BookUser />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totalByLevel("XII")}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">All Teachers</CardTitle>
          <User />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {teachers.length}
        </CardContent>
      </Card>
    </div>
  );
}
