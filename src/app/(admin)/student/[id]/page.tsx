"use client";

// next
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="p-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Setting</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex gap-10 py-10">
        <div className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-20 py-2 bg-muted hover:bg-muted justify-start">
          Profile
        </div>
        {student ? (
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site
            </p>
            <form onSubmit={handleSubmit} className="py-8">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name:
              </label>
              <Input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
              />
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username:
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password:
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                NIS
                <Input
                  type="number"
                  name="nip"
                  value={formData.nis}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <Button type="submit">Update Profile</Button>
            </form>
          </div>
        ) : (
          <p>Loading teacher details...</p>
        )}
      </div>
    </div>
  );
}
