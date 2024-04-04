"use client";

//  next
import { useEffect, useState } from "react";
import Link from "next/link";
// components

// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getTeachersData().then((data) => {
      setTeachers(data);
    });
  }, []);

  return (
    <div className="p-10 bg-muted/40 h-full">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/adminDashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Teacher Attendance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-8">
        <h1 className="text-3xl font-bold">Attendance report of students</h1>
        <p>See and create report daily or weekly students attendance.</p>
      </div>
      <Card className="p-6">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
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
                <TableCell>
                  <Badge>{teacher.role}</Badge>
                </TableCell>
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
      </Card>
    </div>
  );
}
