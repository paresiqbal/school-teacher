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
  const [attendanceRecord, setAttendanceRecord] =
    useState<IAttendanceRecord | null>(null);
  const [teacherName, setTeacherName] = useState<string>("");

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch("http://localhost:3001/class/classes");
      const data = await response.json();
      setClasses(data);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (attendanceRecord) {
      const fetchTeacherDetails = async () => {
        const response = await fetch(
          `http://localhost:3001/user/teacher/${attendanceRecord.teacher}`
        );
        if (!response.ok) return;
        const teacher = await response.json();
        setTeacherName(teacher?.fullname);
      };
      fetchTeacherDetails();
    }
  }, [attendanceRecord]);

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedClass?._id) {
      alert("Please select a date and a class.");
      return;
    }
    const response = await fetch(
      `http://localhost:3001/attendance/attendance-record?date=${selectedDate}&classId=${selectedClass._id}`
    );
    if (!response.ok) return;
    const { attendance } = await response.json();
    setAttendanceRecord(attendance);
  };

  return (
    <div>
      <select
        value={selectedLevel}
        onChange={(e) => {
          const level = e.target.value;
          setSelectedLevel(level);
          // Reset class selection when level changes
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
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <button
        onClick={handleFetchAttendance}
        disabled={!selectedClass || !selectedDate}
      >
        Get Attendance Record
      </button>

      {attendanceRecord && (
        <div>
          <h2>Attendance Record Details</h2>
          <p>Date: {new Date(attendanceRecord.date).toLocaleDateString()}</p>
          <p>
            Class: {selectedLevel} - {selectedClass?.majorName}
          </p>
          <p>Teacher: {teacherName}</p>
          <p>Subject: {attendanceRecord.subject}</p>
          <h3>Students</h3>
          <ul>
            {attendanceRecord.students.map((student) => (
              <li key={student._id}>
                {student.fullname}: {student.isPresent}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
