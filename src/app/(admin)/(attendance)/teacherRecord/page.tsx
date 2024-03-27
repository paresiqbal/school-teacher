"use client";

//  next
import { useEffect, useState } from "react";

// components

// shadcn
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ITeacher {
  _id: string;
  username: string;
  fullname: string;
  nip: number;
  role: string;
}

interface Iid {
  id: string;
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

export default function TeacherRecord({ params }: { params: Iid }) {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    getTeachersData().then((data) => {
      setTeachers(data);
    });
  }, []);

  return (
    <div className="p-10">
      <div className="pb-10">
        <h1 className="text-3xl font-bold">Attendance report of students</h1>
        <p>See and create report daily or weekly students attendance.</p>
      </div>
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
                <Button>
                  <Link href={`/teacherRecord/${teacher._id}`}>
                    See Details
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
