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
  class: string;
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
        setData(attendanceData);
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [params.id]);

  return (
    <div className="flex gap-10">
      <h1>{data ? "Attendance Records" : "Loading..."}</h1>
      {data?.attendanceRecords.map((record) => {
        const matchingClass = classes?.find((cls) => cls._id === record.class); // Find the matching class based on ID
        return (
          <div key={record._id} className="flex">
            <h2>
              {record.subject} - {new Date(record.date).toLocaleDateString()}
              {matchingClass ? (
                <ul>
                  <li>
                    {matchingClass.level} - {matchingClass.majorName}
                  </li>
                </ul>
              ) : (
                <p>Loading class info...</p>
              )}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
