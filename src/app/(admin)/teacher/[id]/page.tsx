"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { z } from "zod";

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
      {teacher ? (
        <div className="flex flex-col py-10">
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site
          </p>
          <form onSubmit={handleSubmit}>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <br />
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              NIP:
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <p>Loading teacher details...</p>
      )}
    </div>
  );
}
