"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { usePresensi } from "@/context/PresensiProvider";

export default function ScannerPresensi() {
  const { setPresensiData, presensiData } = usePresensi();

  const [qrData, setQrData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false); // To indicate successful scanning

  const handleScan = (result: any) => {
    if (result) {
      try {
        const qrResult = JSON.parse(result.text); // Parse the QR code data
        setPresensiData((prev) => ({
          ...prev,
          studentId: qrResult.studentId,
          classId: qrResult.classId,
        }));
        setQrData(JSON.stringify(qrResult, null, 2)); // Store formatted data for display
        setShowModal(true);
        setScanSuccess(true); // Indicate successful scan
      } catch (error) {
        console.error("Error parsing QR code:", error);
        setQrData("Error parsing QR code: " + error);
        setShowModal(true);
        setScanSuccess(false); // Indicate scan failure
      }
    }
  };

  const handleOK = () => {
    setShowModal(false);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1>Presensi</h1>
        <h3>Subject: {presensiData.subject}</h3>
        <h3>Date: {presensiData.date}</h3>
        <p>Teacher ID: {presensiData.teacherId}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">QR Scanner</h1>
        <div>
          <QrReader
            className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]"
            onResult={handleScan}
            constraints={{ facingMode: "environment" }}
          />
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-muted/20 bg-opacity-50 flex justify-center items-center">
            <div className="rounded-md p-4">
              <p>QR Data:</p>
              <div>{scanSuccess ? qrData : "Failed to scan QR Code."}</div>
              <Button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mx-4 mt-4 hover:bg-gray-300"
                onClick={handleOK}
              >
                Ok
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
