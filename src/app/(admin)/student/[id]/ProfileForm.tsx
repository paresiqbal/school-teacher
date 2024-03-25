"use client";

// next
import { useState, useEffect } from "react";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileFormProps {
  id: string;
}

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name is required.",
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  nis: z.coerce.number().int().min(6, {
    message: "NIS must be at least 6 digits.",
  }),
  yearEntry: z.coerce.number().int().min(4, {
    message: "Year of entry must be at least 4 digits.",
  }),
});

export default function ProfileForm({ id }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    nis: "",
    yearEntry: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFormData({
          username: data.username,
          password: "",
          fullname: data.fullname,
          nis: data.nis.toString(),
          yearEntry: data.yearEntry.toString(),
          avatar: data.avatar || "",
        });
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "avatar" && typeof value === "object") {
        payload.append(key, value);
      } else if (key !== "password" || (key === "password" && value)) {
        payload.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(
        `http://localhost:3001/student/update/${id}`,
        {
          method: "PATCH",
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Student updated successfully", data);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="nis"
          value={formData.nis}
          onChange={handleChange}
          placeholder="NIS"
        />
        <input
          type="text"
          name="yearEntry"
          value={formData.yearEntry}
          onChange={handleChange}
          placeholder="Year Entry"
        />
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
