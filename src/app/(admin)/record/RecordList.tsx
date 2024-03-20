"use client";

// next
import { useEffect, useState } from "react";

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

async function getClassesData(): Promise<IClass[]> {
  const res = await fetch("http://localhost:3001/class/classes", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

async function fetchAttendanceRecord(
  date: string,
  classId: string
): Promise<IAttendanceRecord | null> {
  const res = await fetch(
    `http://localhost:3001/attendance/attendance-record?date=${date}&classId=${classId}`
  );
  if (!res.ok) {
    // Error handling
    return null;
  }
  const data = await res.json();
  return data.attendance; // Make sure to return the 'attendance' property of the response
}

export default function RecordList() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<IClass[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [attendanceRecord, setAttendanceRecord] =
    useState<IAttendanceRecord | null>(null);

  const handleClassSelection = (e: any) => {
    const selectedId = e.target.value; // This is the class ID
    const foundClass = classes.find((cls) => cls._id === selectedId);

    if (foundClass) {
      setSelectedClassId(foundClass._id); // Set the selected class ID immediately upon selection
      // Assuming you also want to set level and majorName for display purposes
      setSelectedLevel(foundClass.level);
      setSelectedMajor(foundClass.majorName);
    } else {
      setSelectedClassId("");
      // Reset level and majorName if needed
      setSelectedLevel("");
      setSelectedMajor("");
    }
  };

  const handleFetchAttendance = async () => {
    console.log(
      `Fetching attendance for date: ${selectedDate}, classId: ${selectedClassId}`
    );
    if (!selectedDate || !selectedClassId) {
      alert("Please select a date and a class.");
      return;
    }
    const attendance = await fetchAttendanceRecord(
      selectedDate,
      selectedClassId
    );
    console.log("Fetched attendance:", attendance);
    setAttendanceRecord(attendance);
  };

  useEffect(() => {
    const filtered = classes.filter((cls) => cls.level === selectedLevel);
    setFilteredClasses(filtered);
    setSelectedMajor("");
  }, [selectedLevel, classes]);

  useEffect(() => {
    getClassesData().then(setClasses);
  }, []);

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

      <select
        value={selectedClassId}
        onChange={handleClassSelection} // Use the new handler here
      >
        <option value="">Select Class</option>
        {filteredClasses.map((kelas) => (
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
      {attendanceRecord && attendanceRecord.students && (
        <div>
          <h2>Attendance Record Details</h2>
          <p>Date: {new Date(attendanceRecord.date).toLocaleDateString()}</p>
          <p>Class ID: {attendanceRecord.class}</p>
          <p>Teacher ID: {attendanceRecord.teacher}</p>
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
