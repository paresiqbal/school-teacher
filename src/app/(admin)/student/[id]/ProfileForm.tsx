"use client";

// next
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
          `${process.env.API_BASE_URL}/student/student/${id}`
        );
        if (!response.ok) {
          throw new Error("Siswa tidak ditemukan atau server error");
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
        `${process.env.API_BASE_URL}/student/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal perbarui data siswa");
      }
      const updatedStudent = await response.json();
      setStudent(updatedStudent);
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
    <div className="p-8">
      <div className="py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Profil siswa</h1>
        <p className="text-sm text-muted-foreground">
          Data detail siswa dan preferensi siswa.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 flex flex-col gap-3">
        <label className="text-sm font-medium">
          Nama Lengkap
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
            placeholder="password baru"
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
          Tahun Masuk
          <Input
            type="text"
            name="yearEntry"
            value={student.yearEntry}
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Perbarui Profil</Button>
      </form>
    </div>
  );
}
