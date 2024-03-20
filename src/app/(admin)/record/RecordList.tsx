"use client";

import { useEffect, useState } from "react";

// Define your interfaces for typing your data
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

// Assuming the teacher details includes these properties
interface ITeacherDetails {
  _id: string;
  fullname: string;
  nip: string;
  username: string;
}

// Functions to fetch data from your backend
async function getClassesData(): Promise<IClass[]> {
  const res = await fetch("http://localhost:3001/class/classes");
  return res.json();
}

async function fetchAttendanceRecord(
  date: string,
  classId: string
): Promise<IAttendanceRecord | null> {
  const res = await fetch(
    `http://localhost:3001/attendance/attendance-record?date=${date}&classId=${classId}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.attendance;
}

async function fetchTeacherById(
  teacherId: string
): Promise<ITeacherDetails | null> {
  const response = await fetch(
    `http://localhost:3001/user/teacher/${teacherId}`
  );
  if (!response.ok) return null;
  return response.json();
}

export default function RecordList() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMajorName, setSelectedMajorName] = useState<string>("");
  const [attendanceRecord, setAttendanceRecord] =
    useState<IAttendanceRecord | null>(null);
  const [teacherName, setTeacherName] = useState<string>("");

  useEffect(() => {
    getClassesData().then(setClasses);
  }, []);

  const handleFetchAttendance = async () => {
    if (!selectedDate || !selectedClassId) {
      alert("Please select a date and a class.");
      return;
    }
    const attendance = await fetchAttendanceRecord(
      selectedDate,
      selectedClassId
    );
    if (attendance) {
      setAttendanceRecord(attendance);
      const teacherDetails = await fetchTeacherById(attendance.teacher);
      if (teacherDetails) {
        setTeacherName(teacherDetails.fullname); // Assuming teacher details have a 'fullname' property
      }
    }
  };

  const handleClassSelection = (e: any) => {
    const classId = e.target.value;
    const selectedClass = classes.find((cls) => cls._id === classId);

    if (selectedClass) {
      setSelectedClassId(classId);
      setSelectedMajorName(selectedClass.majorName); // Ensure this sets the majorName
    } else {
      setSelectedClassId("");
      setSelectedMajorName(""); // Reset major name if class selection is invalid
    }
  };

  useEffect(() => {
    // When level changes, reset class selection and major name
    setSelectedClassId("");
    setSelectedMajorName("");
  }, [selectedLevel]);

  return (
    <div>
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
      </select>

      <select value={selectedClassId} onChange={handleClassSelection}>
        <option value="">Select Class</option>
        {classes
          .filter((cls) => cls.level === selectedLevel)
          .map((kelas) => (
            <option key={kelas._id} value={kelas._id}>
              {kelas.level} - {kelas.majorName}
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
        disabled={!selectedClassId || !selectedDate}
      >
        Get Attendance Record
      </button>

      {attendanceRecord && (
        <div>
          <h2>Attendance Record Details</h2>
          <p>Date: {new Date(attendanceRecord.date).toLocaleDateString()}</p>
          <p>
            Class: {selectedLevel} - {selectedMajorName}
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
