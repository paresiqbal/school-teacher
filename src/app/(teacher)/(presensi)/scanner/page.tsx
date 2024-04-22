"use client";

// next
import { useEffect, useState } from "react";

// context
import { usePresensi } from "@/context/PresensiProvider";

// library
import { Html5QrcodeScanner } from "html5-qrcode";

interface IAttendanceData {
  studentId: string;
  classId: string;
  teacherId: string;
  subject: string;
  date: string;
}

interface IApiResponse {
  message: string;
  attendance?: any; // You can further define this based on your backend model
  error?: string;
}

const markAttendance = async ({
  studentId,
  classId,
  teacherId,
  subject,
  date,
}: IAttendanceData): Promise<void> => {
  try {
    const response = await fetch("/api/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, classId, teacherId, subject, date }),
    });

    const data: IApiResponse = await response.json();

    if (response.ok) {
      console.log("Attendance marked successfully:", data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Error marking attendance:", error.message);
  }
};

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    qrCodeScanner.render(
      (decodedText: string) => {
        console.log("Scanned QR Code:", decodedText);
        setScannedData(decodedText);

        try {
          const attendanceData: IAttendanceData = JSON.parse(decodedText);
          markAttendance(attendanceData);
        } catch (error: any) {
          console.error("Error parsing QR code data:", error.message);
        }
      },
      (errorMessage: string) => {
        console.log("Error scanning QR code:", errorMessage);
      }
    );
  }, []);

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-4">QR Scanner</h2>
        <p>
          Subject:
          <span className="font-semibold text-yellow-500">
            {presensiData.subject}
          </span>
        </p>
        <p>Tanggal: {presensiData.date}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div id="reader"></div>
        {scannedData && <p className="mt-4">Scanned Data: {scannedData}</p>}
      </div>
    </div>
  );
}
