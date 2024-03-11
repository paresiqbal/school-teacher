"use client";

// next
import { useEffect, useState } from "react";

// componesnts
import CreateMajor from "./CreateMajor";
import { Card } from "@/components/ui/card";

// shadcn
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CreateClasses from "./CreateClass";

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
      <div className="flex py-10 gap-10">
        <Card className="p-6 w-2/5">
          <CreateMajor />
          <Separator className="my-4" />
          <p>Major list</p>
          {majors.map((major) => (
            <div
              key={major._id}
              className="py-2 flex justify-between items-center"
            >
              <p>{major.majorName}</p>
              <Button variant="destructive">Delete</Button>
            </div>
          ))}
        </Card>
        <Card className="p-6 w-2/3">
          <CreateClasses />
        </Card>
      </div>
    </div>
  );
}
