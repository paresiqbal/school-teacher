"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProfileFormProps {
  id: string;
}

export default function ProfileForm({ id }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    nis: "",
    yearEntry: "",
    avatar: "",
  });

  // Fetch student's original data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/student/student/${id}`
        );
        setFormData({
          username: response.data.username,
          password: "", // Don't fetch passwords for security reasons
          fullname: response.data.fullname,
          nis: response.data.nis.toString(), // Convert to string if necessary
          yearEntry: response.data.yearEntry.toString(), // Convert to string if necessary
          avatar: response.data.avatar || "", // Handle if avatar is optional
        });
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudentData();
  }, [id]); // This effect depends on `id`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Remove the password from the payload if it hasn't been changed
    const payload = formData.password
      ? formData
      : { ...formData, password: undefined };
    try {
      await axios.patch(`http://localhost:3001/student/update/${id}`, payload);
      console.log("Student updated successfully");
      // Add success handling here (e.g., notification to the user)
    } catch (error) {
      console.error("Error updating student:");
      // Add error handling here (e.g., showing an error message)
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
