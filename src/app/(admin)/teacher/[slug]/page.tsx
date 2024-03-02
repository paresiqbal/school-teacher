"use client";

import { useState } from "react";
import axios from "axios";

export default function EditTeacherPage({
  params,
}: {
  params: { slug: string };
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    nip: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/user/teacher/teacher/${params.slug}`,
        formData
      );
      console.log(response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h1>Edit Teacher</h1>
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
          name="nip"
          value={formData.nip}
          onChange={handleChange}
          placeholder="NIP"
        />
        <button type="submit">Update Teacher</button>
      </form>
    </div>
  );
}
