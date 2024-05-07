"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePresensi } from "@/context/PresensiProvider";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRData {
  studentID: string;
  name: string;
  nis: string;
  classID: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();

  const qrRef = useRef<HTMLDivElement>(null);
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onScanSuccess = useCallback(
    (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      parseQRData(decodedText);
    },
    []
  );

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (qrRef.current) {
      scanner = new Html5QrcodeScanner(
        qrRef.current.id,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(onScanSuccess, onScanFailure);
    }

    return () => {
      scanner?.clear();
    };
  }, [onScanSuccess]);

  const onScanFailure = (error: string) => {
    console.warn(`Code scan error = ${error}`);
  };

  const parseQRData = (data: string) => {
    const regex =
      /Student ID: (\w+), Name: ([^,]+), NIS: (\d+), Class ID: (\w+)/;
    const matches = data.match(regex);
    if (matches) {
      const [_, studentID, name, nis, classID] = matches;
      setQrData({ studentID, name, nis, classID });
      sendAttendanceData({ studentID, classID });
    }
  };

  const sendAttendanceData = ({
    studentID,
    classID,
  }: {
    studentID: string;
    classID: string;
  }) => {
    const payload = {
      date: presensiData.date,
      teacherId: presensiData.teacherId,
      subject: presensiData.subject,
      studentId: studentID,
      classId: classID,
    };

    fetch("http://localhost:3001/attendance/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error posting attendance:", error);
        setApiResponse({ error: "Gagal cek presensi" });
      });
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-4">QR Scanner</h2>
        <p>
          Mapel:
          <span className="font-semibold text-yellow-500">
            {presensiData.subject}
          </span>
        </p>
        <p>Tanggal: {presensiData.date}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div id="reader" ref={qrRef} style={{ width: "350px" }}></div>
        {apiResponse && (
          <div>
            <p>
              Status:
              {apiResponse.message || apiResponse.error || "Error"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
