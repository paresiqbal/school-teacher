"use client";

// next
import { useState } from "react";

// context
import { usePresensi } from "@/context/PresensiProvider";

// library
import { QrReader } from "react-qr-reader";

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();

  const [data, setData] = useState("No result");

  const handleScan = (result: any, error: any) => {
    if (!!result) {
      setData(result?.text);
    }
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
        <QrReader
          className="lg:h-[400px] lg:w-[400px] h-[400px] w-[400px]"
          onResult={handleScan}
          constraints={{ facingMode: "environment" }}
        />
        <p>{data}</p>
      </div>
    </div>
  );
}