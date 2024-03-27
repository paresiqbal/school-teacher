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
  students: Student[];
}

interface FetchDataResponse {
  attendanceRecords: AttendanceRecord[];
}

const fetchData = async (
  id: string
): Promise<FetchDataResponse | undefined> => {
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
  }
};

export default function DetailAttendance({ params }: { params: Iid }) {
  const [data, setData] = useState<FetchDataResponse | null>(null);

  useEffect(() => {
    fetchData(params.id).then((data) => {
      if (data !== undefined) {
        setData(data);
      }
    });
  }, [params.id]);

  return (
    <div>
      <h1>{data ? "Attendance Records" : "Loading..."}</h1>
      {data?.attendanceRecords.map((record) => (
        <div key={record._id}>
          <h2>
            {record.subject} - {new Date(record.date).toLocaleDateString()}
          </h2>
          {/* <ul>
            {record.students.map((student) => (
              <li key={student._id}>
                {student.fullname}: {student.isPresent}
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
}
