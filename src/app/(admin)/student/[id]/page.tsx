"use client";

// next
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

// library
import { z } from "zod";
import QRCode from "qrcode";

// shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IStudent {
  username: string;
  password: string;
  fullname: string;
  nis: number;
  yearEntry: number;
}

interface Iid {
  id: string;
}

const studentSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  fullname: z.string().min(1),
  nis: z.number().min(1),
  yearEntry: z.number().min(4),
});

// get students profile
async function updateStudentDetail(id: string, data: IStudent) {
  const res = await fetch(`http://localhost:3001/user/student/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// generate qr base on id
async function generateQRCode(id: string) {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(id);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

export default function StudentDetails({ params }: { params: Iid }) {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [formData, setFormData] = useState<IStudent>({
    fullname: "",
    username: "",
    password: "",
    nis: 0,
    yearEntry: 0,
  });

  const [qrCodeDataURL, setQRCodeDataURL] = useState<string>("");

  const handleGenerateQRCode = async () => {
    if (student) {
      const dataURL = await generateQRCode(student.nis.toString());
      setQRCodeDataURL(dataURL);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = studentSchema.parse(formData);

      // Assuming the backend handles password hashing
      if (student) {
        await updateStudentDetail(params.id, {
          ...validatedData,
          password: formData.password,
        });
        alert("Data updated successfully.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${params.id}`
        );
        const data = await response.json();
        setStudent(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchStudentDetails();
  }, [params.id]);

  return (
    <div className="p-10">
      <div className="pb-10">
        <h1 className="text-2xl font-bold tracking-tight">Setting</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set user preferences.
        </p>
        <Separator className="my-4" />
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 col-span-3">
          <TabsTrigger value="Profile">Profile</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          <TabsTrigger value="password">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="Profile">
          {student ? (
            <div className="flex flex-col w-full py-4">
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site
              </p>
              <form onSubmit={handleSubmit} className="py-8">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Full Name:
                </label>
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
                <br />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username:
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password:
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  NIS
                  <Input
                    type="number"
                    name="nip"
                    value={formData.nis}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <Button type="submit">Update Profile</Button>
                {/* <Button onClick={handleGenerateQRCode}>Generate QR Code</Button>
                {qrCodeDataURL && (
                  <div>
                    <Image
                      width={500}
                      height={500}
                      className="w-32 h-32 rounded-md overflow-hidden"
                      src={qrCodeDataURL}
                      alt="QR Code"
                    />
                    <p>Nama</p>
                  </div>
                )} */}
              </form>
            </div>
          ) : (
            <p>Loading student details...</p>
          )}
        </TabsContent>
        <TabsContent value="Qrcode"></TabsContent>
        <TabsContent value="Delete"></TabsContent>
      </Tabs>
    </div>
  );
}
