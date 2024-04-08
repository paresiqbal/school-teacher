"use client";

import { usePresensi } from "@/context/PresensiProvider";

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Presensi</h2>
        <p>Mapel: {presensiData.subject}</p>
        <p>Tanggal: {presensiData.date}</p>
      </div>
      <div className="py-6 flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mb-4">QR Scanner</h2>
      </div>
    </div>
  );
}
