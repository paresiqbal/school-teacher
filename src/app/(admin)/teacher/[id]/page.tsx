"use client";

// next
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Teacher {
  username: string;
  password: string;
  fullname: string;
  nip?: string; // Making nip property optional
}

interface ParamsType {
  id: string;
}

// Define zod schema
const teacherSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  fullname: z.string().min(1),
  nip: z.string().optional(),
});

// fetching teacher details
async function updateTeacherDetails(id: string, data: Teacher) {
  const res = await fetch(`http://localhost:3001/user/teacher/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function TeacherDetails({ params }: { params: ParamsType }) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<Teacher>({
    fullname: "",
    username: "",
    password: "",
    nip: "",
  });

  useEffect(() => {
    async function fetchTeacherDetails() {
      try {
        const response = await fetch(
          `http://localhost:3001/user/teacher/${params.id}`
        );
        const data: Teacher = await response.json();
        setTeacher(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    }
    fetchTeacherDetails();
  }, [params.id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = teacherSchema.parse(formData);
      if (teacher) {
        await updateTeacherDetails(params.id, validatedData);
        alert("Teacher details updated successfully");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        alert("Validation error. Please check your input.");
      } else {
        console.error("Error updating teacher details:", error);
        alert("Failed to update teacher details. Please try again later.");
      }
    }
  };

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
        {teacher ? (
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
                NIP:
                <Input
                  type="text"
                  name="nip"
                  value={formData.nip}
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
