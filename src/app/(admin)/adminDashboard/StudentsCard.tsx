// next
import { useState, useEffect } from "react";

// shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// icons
import { GraduationCap } from "lucide-react";

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

async function getStudentsData(): Promise<IStudent[]> {
  const res = await fetch("http://localhost:3001/student/students", {
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

  useEffect(() => {
    getStudentsData().then(setStudents);
  }, []);

  const totalByLevel = (level: string) =>
    students.filter((student) => student.class.level === level).length;

  return (
    <div className="flex justify-between py-4 gap-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Level X Students</CardTitle>
          <GraduationCap />
        </CardHeader>
        <CardContent className="card-value">{totalByLevel("X")}</CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Level XI Students</CardTitle>
          <GraduationCap />
        </CardHeader>
        <CardContent className="card-value">{totalByLevel("XI")}</CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center gap-6">
          <CardTitle className="text-md">Level XII Students</CardTitle>
          <GraduationCap />
        </CardHeader>
        <CardContent className="card-value">{totalByLevel("XII")}</CardContent>
      </Card>
    </div>
  );
}
