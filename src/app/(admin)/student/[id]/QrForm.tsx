"use client";

// next
import { useState, useEffect } from "react";
import Image from "next/image";

// libary
import QRCode from "qrcode";
import html2canvas from "html2canvas";

// shadcn
import { Button } from "@/components/ui/button";

type Student = {
  _id: string;
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
      const qrCodeData = `Student ID: ${student._id}, Name: ${student.fullname}, NIS: ${student.nis}`;
      const qrUrl = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Failed to generate QR code");
    }
  };

  const handleDownloadImage = async () => {
    const content = document.getElementById("qr-code-container");
    if (content) {
      const canvas = await html2canvas(content);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "student-qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            <p className="text-lg">
              ID: <span className="font-medium">{student._id}</span>
            </p>
            <p className="text-lg">
              NIS: <span className="font-medium">{student.nis}</span>
            </p>
            <p className="text-lg">
              Name: <span className="font-medium">{student.fullname}</span>
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={handleGenerateQrCode}>Generate QR Code</Button>
              <Button onClick={handleDownloadImage}>Download QR</Button>
            </div>
          </div>
        )}
        {qrCodeUrl && (
          <div
            id="qr-code-container"
            className="text-center bg-white rounded-md p-2"
          >
            <div className="text-center">
              <Image src={qrCodeUrl} alt="QR Code" width={250} height={250} />
              <p className="text-2xl font-bold text-zinc-900">
                {student?.fullname}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
