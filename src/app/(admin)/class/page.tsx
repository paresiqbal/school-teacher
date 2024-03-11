"use client";

// next
import { useEffect, useState } from "react";

// componesnts
import CreateMajor from "./CreateMajor";
import { Card } from "@/components/ui/card";

// shadcn
import { Separator } from "@/components/ui/separator";

interface IMajor {
  _id: string;
  majorName: string;
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
      <div className="flex py-10">
        <Card className="p-6 w-6/12">
          <CreateMajor />
          <Separator className="my-4" />
          {majors.map((major, index) => (
            <p key={major._id}>{major.majorName}</p>
          ))}
        </Card>
      </div>
    </div>
  );
}
