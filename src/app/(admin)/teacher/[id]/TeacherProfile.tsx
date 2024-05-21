import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";

interface ITeacher {
  username: string;
  password: string;
  fullname: string;
  nip: string;
}

interface ProfileFormProps {
  id: string;
}

export default function TeacherProfile({ id }: ProfileFormProps) {
  const [teacher, setTeacher] = useState<ITeacher>({
    username: "",
    password: "",
    fullname: "",
    nip: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.API_BASE_URL}/user/teacher/${id}`
        );
        if (!response.ok) {
          throw new Error("Teacher not found or server error");
        }
        const data = await response.json();
        setTeacher((prev) => ({ ...prev, ...data }));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/user/update-teacher/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacher),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }
      const updatedTeacher = await response.json();
      setTeacher(updatedTeacher);
      toast.success("Teacher updated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Teacher Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Update your profile information here.
        </p>
      </div>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
        <label className="text-sm font-medium">
          Full Name
          <Input
            type="text"
            name="fullname"
            value={teacher.fullname}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium">
          Username
          <Input
            type="text"
            name="username"
            value={teacher.username}
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium">
          Password
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={handleChange}
          />
        </label>
        <label className="text-sm font-medium">
          NIP
          <Input
            type="text"
            name="nip"
            value={teacher.nip}
            onChange={handleChange}
          />
        </label>
        <Button type="submit" disabled={loading}>
          Update Profile
        </Button>
      </form>
    </div>
  );
}
