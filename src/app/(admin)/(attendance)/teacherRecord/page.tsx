"use client";

//  next
import { useEffect, useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ITeacher {
  _id: string;
  username: string;
  fullname: string;
  nip: number;
  role: string;
}

async function getTeachersData(): Promise<ITeacher[]> {
  const res = await fetch("http://localhost:3001/user/teachers", {
    cache: "no-store",
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default function TeacherRecord() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    getTeachersData().then((data) => {
      setTeachers(data);
    });
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of teachers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead className="w-[400px]">NIP</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher._id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{teacher.fullname}</TableCell>
              <TableCell className="w-[400px]">{teacher.nip}</TableCell>
              <TableCell>{teacher.role}</TableCell>
              <TableCell className="text-right space-x-1">
                <Button>Attendance Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
