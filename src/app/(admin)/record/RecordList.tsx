"use client";

import { useEffect, useState } from "react";

import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define interfaces
interface IStudentAttendance {
  id: string;
  fullname: string;
  class: string;
  isPresent: string;
  _id: string;
}

interface IClass {
  _id: string;
  level: string;
  majorName: string;
}

interface IAttendanceRecord {
  _id: string;
  date: string;
  class: string;
  teacher: string;
  subject: string;
  students: IStudentAttendance[];
}

interface ITeacherDetails {
  _id: string;
  fullname: string;
  nip: string;
  username: string;
}

export default function RecordList() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<IClass | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    IAttendanceRecord[]
  >([]);
  const [teacherNames, setTeacherNames] = useState<string[]>([]);

  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch("http://localhost:3001/class/classes");
      const data = await response.json();
      setClasses(data);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchTeacherDetails = async (teacherId: string) => {
      const response = await fetch(
        `http://localhost:3001/user/teacher/${teacherId}`
      );
      if (!response.ok) return null;
      const teacher = await response.json();
      return teacher?.fullname;
    };

    const fetchAllTeacherNames = async () => {
      const names = await Promise.all(
        attendanceRecords.map((record) => fetchTeacherDetails(record.teacher))
      );
      setTeacherNames(names.filter((name) => name !== null) as string[]);
    };

    if (attendanceRecords.length > 0) {
      fetchAllTeacherNames();
    }
  }, [attendanceRecords]);

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedClass?._id) {
      alert("Please select a date and a class.");
      return;
    }
    const response = await fetch(
      `http://localhost:3001/attendance/attendance-record?date=${selectedDate}&classId=${selectedClass._id}`
    );
    if (!response.ok) return;
    const data = await response.json();
    setAttendanceRecords(data.attendanceRecords);
  };

  return (
    <div>
      <div className="flex gap-10 items-center py-2">
        <div>
          <label
            htmlFor="level"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Level:
          </label>
          <select
            className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-3"
            value={selectedLevel}
            onChange={(e) => {
              const level = e.target.value;
              setSelectedLevel(level);
              setSelectedClass(null);
            }}
          >
            <option value="">Select Level</option>
            {Array.from(new Set(classes.map((cls) => cls.level))).map(
              (level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="level"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Major
          </label>
          <select
            className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-3"
            value={selectedClass?._id || ""}
            onChange={(e) => {
              const classId = e.target.value;
              const cls = classes.find((c) => c._id === classId) || null;
              setSelectedClass(cls);
            }}
            disabled={!selectedLevel}
          >
            <option value="">Select Class</option>
            {classes
              .filter((cls) => cls.level === selectedLevel)
              .map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.majorName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="butotn"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                disabled={!selectedClass}
              >
                <MdOutlineDateRange className="mr-2" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setSelectedDate(format(newDate, "yyyy-MM-dd"));
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label
            htmlFor="butotn"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Search
          </label>
          <Button
            onClick={handleFetchAttendance}
            disabled={!selectedClass || !selectedDate}
          >
            Search
          </Button>
        </div>
      </div>
      {attendanceRecords.length > 0 && (
        <div className="my-10">
          {attendanceRecords.map((record, index) => (
            <div key={index} className="py-10">
              <h2 className="text-2xl font-bold">Attendance Record Details</h2>
              <p className="mt-2">
                Date: {new Date(record.date).toLocaleDateString()}
              </p>
              <p className="mt-2">
                Class: {selectedLevel} - {selectedClass?.majorName}
              </p>
              <p>Teacher: {teacherNames[index]}</p>
              <p>Subject: {record.subject}</p>
              <Table>
                <TableCaption>Attendance List</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Presence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.students.map((student, studentIndex) => (
                    <TableRow key={student._id}>
                      <TableCell>{studentIndex + 1}</TableCell>
                      <TableCell>{student.fullname}</TableCell>
                      <TableCell>{student.isPresent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
