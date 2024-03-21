"use client";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col space-y-4">
      <select
        className="p-2 border border-gray-300 rounded-md"
        value={selectedLevel}
        onChange={(e) => {
          const level = e.target.value;
          setSelectedLevel(level);
          setSelectedClass(null);
        }}
      >
        <option value="">Select Level</option>
        {Array.from(new Set(classes.map((cls) => cls.level))).map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        className="p-2 border border-gray-300 rounded-md"
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

      <input
        className="p-2 border border-gray-300 rounded-md"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <button
        className="p-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        onClick={handleFetchAttendance}
        disabled={!selectedClass || !selectedDate}
      >
        Get Attendance Record
      </button>

      {attendanceRecords.length > 0 && (
        <div className="mt-4">
          {attendanceRecords.map((record, index) => (
            <div key={index} className="mt-4">
              <h2 className="text-2xl font-bold">Attendance Record Details</h2>
              <p className="mt-2">
                Date: {new Date(attendanceRecords[0].date).toLocaleDateString()}
              </p>
              <p className="mt-2">
                Class: {selectedLevel} - {selectedClass?.majorName}
              </p>
              <p>Teacher: {teacherNames[index]}</p>
              <p>Subject: {record.subject}</p>
              <h3 className="text-xl font-bold mt-2">Students</h3>
              <ul className="list-disc list-inside">
                {record.students.map((student) => (
                  <li key={student._id}>
                    {student.fullname}: {student.isPresent}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
