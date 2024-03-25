"use client";
import { useState } from "react";
import axios from "axios";

// Assuming you're using TypeScript, it's good practice to define the props type
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/update/${id}`, formData);
      console.log("Student updated successfully:", response.data);
      // Handle success (e.g., showing a success message)
    } catch (error) {
      console.error("Error updating student:");
      // Handle error (e.g., showing an error message)
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
