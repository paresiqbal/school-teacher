"use client";

import { useEffect, useState } from "react";

interface Iid {
  id: string;
}

interface Student {
  _id: string;
  fullname: string;
  isPresent: boolean;
}

interface AttendanceRecord {
  _id: string;
  subject: string;
  date: string;
  classId: string; // Make sure this matches the class _id you want to display
  students: Student[];
}

interface FetchDataResponse {
  attendanceRecords: AttendanceRecord[];
}

interface ClassInfo {
  _id: string;
  level: string;
  majorId: string;
  majorName: string;
  __v: number;
}

const fetchData = async (id: string): Promise<FetchDataResponse | null> => {
  const params = new URLSearchParams({ teacherId: id });
  const url = `http://localhost:3001/attendance/attendance-teacher/?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as FetchDataResponse;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchClasses = async (): Promise<ClassInfo[] | null> => {
  const url = `http://localhost:3001/class/classes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const classes = (await response.json()) as ClassInfo[];
    return classes;
  } catch (error) {
    console.error("Failed to fetch classes:", error);
    return null;
  }
};

export default function DetailAttendance({ params }: { params: Iid }) {
  const [data, setData] = useState<FetchDataResponse | null>(null);
  const [classes, setClasses] = useState<ClassInfo[] | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const attendancePromise = fetchData(params.id);
      const classesPromise = fetchClasses();

      try {
        const [attendanceData, classData] = await Promise.all([
          attendancePromise,
          classesPromise,
        ]);
        console.log("Attendance Data:", attendanceData); // Log attendance data
        console.log("Class Data:", classData); // Log class data
        setData(attendanceData);
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [params.id]);

  // Function to find class information by ID
  const findClassById = (classId: string) => {
    return classes?.find((cls) => cls._id === classId);
  };

  return (
    <div>
      <h1>{data ? "Attendance Records" : "Loading..."}</h1>
      {data?.attendanceRecords.map((record) => {
        // Find the class for this record
        const classInfo = findClassById(record.classId);
        return (
          <div key={record._id}>
            <h2>
              {record.subject} - {new Date(record.date).toLocaleDateString()}
              {classInfo
                ? ` - ${classInfo.level} - ${classInfo.majorName}`
                : ""}
            </h2>
          </div>
        );
      })}

      {classes ? (
        <ul>
          {classes.map((cls) => (
            <li key={cls._id}>
              {cls.level} - {cls.majorName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading classes...</p>
      )}
    </div>
  );
}
