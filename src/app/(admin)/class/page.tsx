"use client";
import { useEffect, useState } from "react";
import CreateClass from "./CreateClass";
import CreateMajor from "./CreateMajor";

interface IMajor {
  _id: string;
  major: string;
}

// get all majors
async function getMajors(): Promise<IMajor[]> {
  const response = await fetch("http://localhost:3001/class/majors", {
    next: {
      revalidate: 0,
    },
  });

  return response.json();
}

export default function ClassPage() {
  const [majors, setMajors] = useState<IMajor[]>([]);
  useEffect(() => {
    getMajors().then((data) => setMajors(data));
  }, []);

  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Create a major and classes</h1>
        <p>create major and class.</p>
      </div>
      <div className="flex">
        <div className="w-5/10">
          <CreateClass />
        </div>
        <div className="w-5/10">
          <CreateMajor />
          {majors.map((major, index) => (
            <p key={major._id}>{major.major}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
