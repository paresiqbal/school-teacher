// type ParamsType = {
//   id: string;
// };

// async function getTeacherDetails(id: string) {
//   const res = await fetch("http://localhost:3001/user/teacher/" + id, {
//     next: {
//       revalidate: 0,
//     },
//   });

//   return res.json();
// }

// export default async function TeacherDetails({
//   params,
// }: {
//   params: ParamsType;
// }) {
//   const teacher = await getTeacherDetails(params.id);
//   return (
//     <div>
//       <h1>{teacher.fullname}</h1>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Teacher {
  fullname: string;
  username: string;
  password: string;
  nip: string;
}

interface ParamsType {
  id: string;
}

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
  const [editMode, setEditMode] = useState<boolean>(false);
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
      if (teacher) {
        await updateTeacherDetails(params.id, formData);
        setTeacher(formData);
        setEditMode(false);
        alert("Teacher details updated successfully");
      }
    } catch (error) {
      console.error("Error updating teacher details:", error);
      alert("Failed to update teacher details. Please try again later.");
    }
  };

  return (
    <div>
      {teacher ? (
        <div>
          <h1>{teacher.fullname}</h1>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </label>
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
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
        </div>
      ) : (
        <p>Loading teacher details...</p>
      )}
    </div>
  );
}
