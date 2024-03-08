"use client";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IStudent {
  username: string;
  password: string;
  fullname: string;
  nis: string;
}

interface Iid {
  id: string;
}

const studentSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  fullname: z.string().min(1),
  nis: z.string().min(1),
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

export default function StudentDetails() {
  return (
    <div>
      <h1></h1>
    </div>
  );
}
