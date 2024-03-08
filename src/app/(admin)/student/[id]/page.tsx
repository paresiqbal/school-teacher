"use client";

// next
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IStudent {
  username: string;
  password: string;
  fullname: string;
  nis: number;
  yearEntry: number;
}

interface Iid {
  id: string;
}

const studentSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  fullname: z.string().min(1),
  nis: z.number().min(1),
  yearEntry: z.number().min(4),
});

async function updateStudentDetail(id: string, data: IStudent) {
  const res = await fetch(`http://localhost:3001/user/student/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function StudentDetails({ params }: { params: Iid }) {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [formData, setFormData] = useState<IStudent>({
    fullname: "",
    username: "",
    password: "",
    nis: 0,
    yearEntry: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = studentSchema.parse(formData);
      if (student) {
        await updateStudentDetail(params.id, validatedData);
        alert("Data updated");
      }
    } catch (error) {
      if (error) {
        console.error("Validation error:");
        alert("Validation error. Please check your input.");
      } else {
        console.error("Error updating teacher details:");
        alert("Failed to update teacher details. Please try again later.");
      }
    }
  };

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${params.id}`
        );
        const data = await response.json();
        setStudent(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchStudentDetails();
  }, [params.id]);

  return (
    <div>
      <h1></h1>
    </div>
  );
}
