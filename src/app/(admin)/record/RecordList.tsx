"use client";

import { useEffect, useState } from "react";

// icons
import { RxCaretSort } from "react-icons/rx";

// shadcn
import { Button } from "@/components/ui/button";
import {
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
import Selector from "./Selector";
import EditDialog from "./EditDialog";

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

  const updateAttendanceStatusInState = (
    attendanceId: string,
    studentId: string,
    newStatus: string
  ) => {
    setAttendanceRecords((currentRecords) =>
      currentRecords.map((record) => {
        if (record._id === attendanceId) {
          const updatedStudents = record.students.map((student) => {
            if (student.id === studentId) {
              return { ...student, isPresent: newStatus };
            }
            return student;
          });
          return { ...record, students: updatedStudents };
        }
        return record;
      })
    );
  };

  return (
    <div>
      <Selector
        classes={classes}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        date={date}
        setDate={setDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleFetchAttendance={handleFetchAttendance}
      />

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
                  <Button className="flex p-2 rounded-md hover:bg-yellow-500">
                    <RxCaretSort className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Toggle</span>
                  </Button>
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
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {record.students.map((student, studentIndex) => (
                          <TableRow
                            key={student._id}
                            className="border-b even:bg-zinc-800"
                          >
                            <TableCell className="p-2">
                              {studentIndex + 1}
                            </TableCell>
                            <TableCell>{student.fullname}</TableCell>
                            <TableCell>{student.isPresent}</TableCell>
                            <TableCell>
                              <EditDialog
                                attendanceId={record._id}
                                studentId={student.id}
                                currentPresence={student.isPresent}
                                onUpdate={updateAttendanceStatusInState}
                              />
                            </TableCell>
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
