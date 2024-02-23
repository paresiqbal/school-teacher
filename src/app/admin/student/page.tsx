"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Assuming you are using Axios for HTTP requests
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Define the Student interface
interface Student {
  _id: string;
  username: string;
  fullName: string;
}

export default function StudentComponent() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]); // Use the Student interface here

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/student/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        // Handle the error appropriately
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/admin/student/register")}>
        Add new student +
      </Button>
      <div>
        {students.map((student) => (
          <div key={student._id}>
            <p>{student.fullName}</p>
            <p>{student.username}</p>
            {/* Display other student details here */}
          </div>
        ))}
      </div>
    </div>
  );
}
