"use client";

import { useEffect, useState } from "react";

// icons
import { MdOutlineDateRange } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";

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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
        <div className="my-10 space-y-4">
          {attendanceRecords.map((record, index) => (
            <Collapsible
              key={index}
              className="bg-zinc-900 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 text-sm font-semibold bg-zinc-900">
                <div className="flex items-center gap-4">
                  <p className="text-yellow-500">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                  <p>
                    {selectedLevel} - {selectedClass?.majorName}
                  </p>
                  <p>{teacherNames[index]}</p>
                </div>
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200">
                    <RxCaretSort className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Toggle</span>
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="p-4">
                  <div className="space-y-2">
                    <p>
                      <strong>Date:</strong>
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Class:</strong> {selectedLevel} -
                      {selectedClass?.majorName}
                    </p>
                    <p>
                      <strong>Teacher:</strong> {teacherNames[index]}
                    </p>
                    <p>
                      <strong>Subject:</strong> {record.subject}
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <TableCaption className="p-2 text-lg font-medium">
                        Attendance List
                      </TableCaption>
                      <TableHeader>
                        <TableRow className="bg-zinc-950">
                          <TableHead className="p-2">No.</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Presence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {record.students.map((student, studentIndex) => (
                          <TableRow
                            key={student._id}
                            className="border-b even:bg-zinc-950"
                          >
                            <TableCell className="p-2">
                              {studentIndex + 1}
                            </TableCell>
                            <TableCell>{student.fullname}</TableCell>
                            <TableCell>{student.isPresent}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </table>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
