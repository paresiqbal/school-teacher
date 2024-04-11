"use client";

// next
import { useEffect, useState } from "react";

// context
import { usePresensi } from "@/context/PresensiProvider";

// library
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();
  const [scannedData, setScannedData] = useState<string | null>(null); // State to store scanned QR code data

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    qrCodeScanner.render(
      (decodedText) => {
        // handle successful scan
        console.log("Scanned QR Code:", decodedText);
        setScannedData(decodedText); // Update state with scanned data
      },
      (errorMessage) => {
        // handle scan failure
        console.error("Error scanning QR code:", errorMessage);
      }
    );

    return () => {
      qrCodeScanner.clear(); // Clean up the scanner when component unmounts
    };
  }, []);

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
        <div id="reader"></div>
        {scannedData && ( // Render scanned data if available
          <p className="mt-4">Scanned Data: {scannedData}</p>
        )}
      </div>
    </div>
  );
}
