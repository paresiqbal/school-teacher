"use client";

// next
import Link from "next/link";
import { useState, useEffect } from "react";

import StudentRegister from "./StudentRegister";

// shadcn
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClassInfo {
  _id: string;
  level: string;
  majorName: string;
}

interface Student {
  _id: number; // Updated from number to string to match your data
  username: string;
  fullname: string;
  class: ClassInfo; // Updated to use the ClassInfo type
}

async function getStudentsData(): Promise<Student[]> {
  const res = await fetch("http://localhost:3001/student/students", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

async function deleteStudent(id: number): Promise<void> {
  try {
    const res = await fetch(`http://localhost:3001/student/delete/${id}`, {
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

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    getStudentsData().then(setStudents);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
  };

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
              <div className="flex gap-6 items-center">
                <div>
                  <h3 className="text-md font-medium leading-none">
                    {student.username}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {student.fullname}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{`${student.class.level} - ${student.class.majorName}`}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Link href={`/student/${student._id}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
