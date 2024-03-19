"use client";

// next
import { useCallback, useEffect, useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

interface IClassInfo {
  _id: string;
  level: string;
  majorName: string;
}

interface IStudent {
  _id: number;
  username: string;
  fullname: string;
  class: IClassInfo;
}

interface IMajor {
  _id: string;
  majorName: string;
}

async function getStudentsData(): Promise<IStudent[]> {
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

async function getMajorsData(): Promise<IMajor[]> {
  const res = await fetch("http://localhost:3001/class/majors", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default function StudentList() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [majors, setMajors] = useState<IMajor[]>([]);

  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
  };

  const filterStudents = useCallback(() => {
    const tempStudents = students.filter((student) => {
      return (
        (selectedLevel ? student.class.level === selectedLevel : true) &&
        (selectedMajor ? student.class.majorName === selectedMajor : true)
      );
    });

    setFilteredStudents(tempStudents);
  }, [students, selectedLevel, selectedMajor]);

  useEffect(() => {
    getMajorsData().then((data) => {
      setMajors(data);
    });
    getStudentsData().then((data) => {
      setStudents(data);
      filterStudents();
    });
  }, [filterStudents]);

  return (
    <div>
      <label
        htmlFor="level-select"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Level:
      </label>
      <select
        id="level-select"
        className="bg-zinc-50 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-2.5"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
      </select>

      <label htmlFor="major-select">Major:</label>
      <select
        id="major-select"
        value={selectedMajor}
        onChange={(e) => setSelectedMajor(e.target.value)}
      >
        <option value="">All Majors</option>
        {majors.map((major) => (
          <option key={major._id} value={major.majorName}>
            {major.majorName}
          </option>
        ))}
      </select>
      <Table>
        <TableCaption>A list of students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student._id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{student.fullname}</TableCell>
              <TableCell>{student.class.level}</TableCell>
              <TableCell>{`${student.class.level} - ${student.class.majorName}`}</TableCell>
              <TableCell className="text-right space-x-1">
                <Button>
                  <Link href={`/student/${student._id}`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(student._id)}
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
