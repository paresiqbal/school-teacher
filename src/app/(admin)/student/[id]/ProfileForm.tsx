"use client";

// next
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "sonner";

interface ProfileFormProps {
  id: string;
}

export default function ProfileForm({ id }: ProfileFormProps) {
  const [student, setStudent] = useState({
    username: "",
    password: "",
    fullname: "",
    nis: "",
    yearEntry: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${id}`
        );
        if (!response.ok) {
          throw new Error("Student not found or server error");
        }
        const data = await response.json();
        setStudent((prev) => ({ ...prev, ...data }));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/student/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }
      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      toast.success("Data updated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className="space-y-2 flex flex-col gap-3">
        <label className="text-sm font-medium">
          Full Name
          <Input
            type="text"
            name="fullname"
            value={student.fullname}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium flex flex-col gap-2">
          Username
          <Input
            type="text"
            name="username"
            value={student.username}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium flex flex-col gap-2">
          Password
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium flex flex-col gap-2">
          NIS
          <Input
            type="text"
            name="nis"
            value={student.nis}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium flex flex-col gap-2">
          Year of Entry
          <Input
            type="text"
            name="yearEntry"
            value={student.yearEntry}
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
