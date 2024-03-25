"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Student = {
  id: string;
  nis: string;
  fullname: string;
  major: string;
};

export default function QrForm({ id }: { id: string }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch student data");

        // Ensure there's data to parse
        const text = await response.text();
        if (!text) throw new Error("No data returned from fetch");

        const data: Student = JSON.parse(text);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to load student details");
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleGenerateQrCode = async () => {
    try {
      if (!student) return;
      const qrCodeData = `Student ID: ${student.id}, Name: ${student.fullname}`;
      const qrUrl = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Failed to generate QR code");
    }
  };

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-semibold tracking-tight">QR Code</h1>
        <p className="text-sm text-muted-foreground">
          Generate QR Code to be use for checking attendance.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-52">
        {error && <p className="text-red-500">Error: {error}</p>}
        {student && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <p className="text-lg">
              Student Name:{" "}
              <span className="font-medium">{student.fullname}</span>
            </p>
            <p className="text-lg">
              Major: <span className="font-medium">{student.major}</span>
            </p>
            <Button onClick={handleGenerateQrCode}>Generate QR Code</Button>
          </div>
        )}
        {qrCodeUrl && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">QR Code:</p>
            <Image src={qrCodeUrl} alt="QR Code" width={300} height={300} />
            <p className="text-lg mt-4">{student?.fullname}</p>
            <a
              href={qrCodeUrl}
              download={`${student?.fullname}-QRCode.png`}
              className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold py-2 px-4 rounded"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
