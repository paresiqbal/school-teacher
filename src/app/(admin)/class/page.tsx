"use client";

// next
import { useEffect, useState } from "react";
import Link from "next/link";

// componesnts
import CreateMajor from "./CreateMajor";
import CreateClass from "./CreateClass";

// shadcn
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface IMajor {
  _id: string;
  majorName: string;
}

interface IClass {
  _id: string;
  level: string;
  majorName: string;
}

// get all majors
async function getMajors(): Promise<IMajor[]> {
  const response = await fetch("http://localhost:3001/class/majors", {
    next: {
      revalidate: 3,
    },
  });

  return response.json();
}

// get all classes
async function getClasses() {
  const response = await fetch("http://localhost:3001/class/classes", {
    next: {
      revalidate: 3,
    },
  });

  return response.json();
}

export default function ClassPage() {
  const [majors, setMajors] = useState<IMajor[]>([]);
  const [classes, setClasses] = useState<IClass[]>([]);

  // delete major by ID
  const deleteMajor = async (majorId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/class/delete-major/${majorId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the major");
      }

      setMajors(majors.filter((major) => major._id !== majorId));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (classId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/class/delete-class/${classId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the class");
      }

      setClasses(classes.filter((classItem) => classItem._id !== classId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMajors().then((data) => setMajors(data));
    getClasses().then((data) => setClasses(data));
  }, []);

  return (
    <div className="p-10 bg-muted/40 h-full">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/adminDashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kelas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-8">
        <h1 className="text-3xl font-bold">Buat kelas dan jurusan.</h1>
        <p>buat kelas dan jurusan disetiap prodi.</p>
      </div>
      <div className="flex py-10 gap-10">
        <Card className="p-6 w-2/5">
          <CreateMajor />
          <Separator className="my-4" />
          <p>Daftar Jurusan</p>
          {majors.map((major) => (
            <div
              key={major._id}
              className="py-2 flex justify-between items-center"
            >
              <p>{major.majorName}</p>
              <Button
                variant="destructive"
                onClick={() => deleteMajor(major._id)}
              >
                Hapus
              </Button>
            </div>
          ))}
        </Card>
        <Card className="p-6 w-2/3">
          <CreateClass />
          <Separator className="my-4" />
          <p>Daftar Kelas</p>
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="py-2 flex justify-between items-center"
            >
              <p>
                {classItem.level} - {classItem.majorName}
              </p>
              <Button
                variant="destructive"
                onClick={() => deleteClass(classItem._id)}
              >
                Hapus
              </Button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
