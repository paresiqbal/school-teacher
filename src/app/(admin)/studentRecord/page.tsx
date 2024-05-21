"use client";

// next
import { useEffect, useState } from "react";
import Link from "next/link";

// components
import Selector from "../../../components/common/Selector";
import EditDialog from "../../../components/common/EditDialog";
import { generatePDF } from "../../../components/common/generatePDF";

// icons
import { ChevronsUpDown } from "lucide-react";

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function StudentRecord() {
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
      const response = await fetch(`${process.env.API_CLASSES}`);
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
            <BreadcrumbPage>Presensi Siswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-8">
        <h1 className="text-3xl font-bold">Laporan kehadiran siswa.</h1>
        <p>Membuat dan mengedit laporan kehadiran siswa harian.</p>
      </div>
      <Card className="p-6">
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
                      <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="p-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Tanggal</strong>
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Kelas</strong> {selectedLevel} -
                        {selectedClass?.majorName}
                      </p>
                      <p>
                        <strong>Guru</strong> {teacherNames[index]}
                      </p>
                      <p>
                        <strong>Mapel</strong> {record.subject}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <TableCaption className="p-2 text-lg font-medium">
                          Daftar Presensi
                        </TableCaption>
                        <TableHeader>
                          <TableRow className="bg-zinc-950">
                            <TableHead className="p-2">No.</TableHead>
                            <TableHead>Nama Siswa</TableHead>
                            <TableHead>Kehadiran</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
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
                              <TableCell>
                                <Badge variant="outline">
                                  {student.isPresent}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
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
            <Button
              onClick={() =>
                generatePDF(
                  attendanceRecords,
                  teacherNames,
                  selectedLevel,
                  selectedClass
                )
              }
            >
              Buat PDF
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
