"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
      alert("Student updated successfully!");
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
    <form onSubmit={handleSubmit}>
      <h1>Update Student Profile</h1>
      <label>
        Username:{" "}
        <input
          type="text"
          name="username"
          value={student.username}
          onChange={handleChange}
        />
      </label>
      {/* Omit password field if not intended for update */}
      <label>
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
        />
      </label>
      <label>
        Full Name:{" "}
        <input
          type="text"
          name="fullname"
          value={student.fullname}
          onChange={handleChange}
        />
      </label>
      <label>
        NIS:{" "}
        <input
          type="text"
          name="nis"
          value={student.nis}
          onChange={handleChange}
        />
      </label>
      <label>
        Year of Entry:{" "}
        <input
          type="text"
          name="yearEntry"
          value={student.yearEntry}
          onChange={handleChange}
        />
      </label>
      <label>
        Avatar URL:{" "}
        <input
          type="text"
          name="avatar"
          value={student.avatar}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
}
