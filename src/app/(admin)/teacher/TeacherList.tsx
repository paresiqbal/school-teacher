"use client";

// next
import { useEffect, useState } from "react";
import Link from "next/link";

// shadcn
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// icons
import { Search } from "lucide-react";

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

async function deleteTeacher(id: string): Promise<void> {
  try {
    const res = await fetch(`http://localhost:3001/user/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
}

export default function TeacherList() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string) => {
    await deleteTeacher(id);
    setTeachers((currentTeachers) =>
      currentTeachers.filter((teacher) => teacher._id !== id)
    );
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getTeachersData().then((data) => {
      setTeachers(data);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between py-4">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Students
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage student and view their details.
          </p>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
                  <Link href={`/teacher/${teacher._id}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(teacher._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
