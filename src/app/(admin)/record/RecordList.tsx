"use client";

import { useEffect, useState } from "react";

interface IRecord {
  attendance: {
    date: string;
    classId: string;
  };
}

interface IAttendanceParams {
  date: string;
  classId: string;
}

interface IMajor {
  _id: string;
  level: string;
  majorId: string;
  majorName: string;
}

async function getMajorsData(): Promise<IMajor[]> {
  const res = await fetch("http://localhost:3001/class/majors", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

async function getAttendanceRecord({
  date,
  classId,
}: IAttendanceParams): Promise<IRecord | null> {
  try {
    const response = await fetch(
      `http://localhost:3001/attendance/attendance-record?date=${date}&classId=${classId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.attendance) {
      // Check if the 'attendance' object is present in the response
      return null; // or return a specific structure indicating no records found
    }

    return data;
  } catch (error) {
    console.error("Error fetching attendance record:", error);
    return null;
  }
}

export default function RecordList() {
  const [date, setDate] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [majors, setMajors] = useState<IMajor[]>([]);
  const [attendanceRecord, setAttendanceRecord] = useState<IRecord | null>(
    null
  );

  useEffect(() => {
    const fetchMajors = async () => {
      const majorsData = await getMajorsData();
      setMajors(majorsData);
    };

    fetchMajors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedClassId) {
      const record = await getAttendanceRecord({
        date,
        classId: selectedClassId,
      });
      if (record) {
        setAttendanceRecord(record);
      } else {
        // Handle case where no record is found or there's an error
        console.log("No attendance record found or error occurred");
        setAttendanceRecord(null); // Ensure UI reflects no data / error state
      }
    }
  };

  return (
    <div>
      <div>
        <h2>Record List</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
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
          </div>
          <div>
            <label htmlFor="class">Class: </label>
            <select
              id="class"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              required
            >
              <option value="">Select a class</option>
              {majors.map((major) => (
                <option key={major._id} value={major._id}>
                  {major.level} - {major.majorName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Fetch Attendance Record</button>
        </form>
        {attendanceRecord ? (
          <div>
            <h3>Attendance Details</h3>
            <p>Date: {attendanceRecord.attendance.date}</p>
            <p>Class ID: {attendanceRecord.attendance.classId}</p>
            {/* Render more details from attendanceRecord here */}
          </div>
        ) : (
          <p>No attendance record found for the selected date and class.</p>
        )}
      </div>
    </div>
  );
}
