"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { usePresensi } from "@/context/PresensiProvider"; // Ensure this import is correct

export default function ScannerPresensi() {
  const { presensiData } = usePresensi(); // Accessing data from context

  const [qrData, setQrData] = useState("No result");
  const [showModal, setShowModal] = useState(false);

  const handleScan = (result: any) => {
    if (result) {
      setQrData(result.text);
      setShowModal(true);
    }
  };

  const handleOK = () => {
    setShowModal(false);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1>Presensi</h1>
        <h3>Subject: {presensiData.subject}</h3>{" "}
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
              <p>QR Data: {qrData}</p>
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
