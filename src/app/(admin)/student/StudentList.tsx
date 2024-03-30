"use client";

// next
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

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

  const handleSelect = (level: any) => {
    setSelectedLevel(level);
    // Additional logic to handle the selected level can be added here
  };

  const handleSelectMajor = (majorName: any) => {
    setSelectedMajor(majorName);
    // You can add additional logic here if needed
  };

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
      <div className="flex justify-between py-6">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Students
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage student and view their details.
          </p>
        </div>
        <div className="flex gap-10 items-center">
          {/* <div>
            <label
              htmlFor="level-select"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Level:
            </label>
            <select
              id="level-select"
              className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-3"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Level</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedLevel === "X"}
                onCheckedChange={() => handleSelect("X")}
              >
                X
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedLevel === "XI"}
                onCheckedChange={() => handleSelect("XI")}
              >
                XI
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedLevel === "XII"}
                onCheckedChange={() => handleSelect("XII")}
              >
                XII
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Majors</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Major</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedMajor === ""}
                onCheckedChange={() => handleSelectMajor("")}
              >
                All Majors
              </DropdownMenuCheckboxItem>
              {majors.map((major) => (
                <DropdownMenuCheckboxItem
                  key={major._id}
                  checked={selectedMajor === major.majorName}
                  onCheckedChange={() => handleSelectMajor(major.majorName)}
                >
                  {major.majorName}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
