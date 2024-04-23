"use client";

// next
import { useEffect, useState, useRef } from "react";

// context
import { usePresensi } from "@/context/PresensiProvider";

// library
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRData {
  studentID: string;
  name: string;
  nis: string;
  classID: string;
}

export default function ScannerPresensi() {
  const { presensiData } = usePresensi();
  // const [scannedData, setScannedData] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrData, setQrData] = useState<QRData | null>(null);

  // useEffect(() => {
  //   const qrCodeScanner = new Html5QrcodeScanner(
  //     "reader",
  //     { fps: 10, qrbox: { width: 250, height: 250 } },
  //     false
  //   );

  //   qrCodeScanner.render(
  //     (decodedText: string) => {
  //       console.log("Scanned QR Code:", decodedText);
  //       setScannedData(decodedText);
  //     },
  //     (errorMessage: string) => {
  //       console.log("Error scanning QR code:", errorMessage);
  //     }
  //   );
  // }, []);

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
  }, []);

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    parseQRData(decodedText);
  };

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
    }
  };

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
        <div id="reader" ref={qrRef} style={{ width: "600px" }}></div>
        {qrData && (
          <div className="qr-data">
            <p>
              <strong>Student ID:</strong> {qrData.studentID}
            </p>
            <p>
              <strong>Name:</strong> {qrData.name}
            </p>
            <p>
              <strong>NIS:</strong> {qrData.nis}
            </p>
            <p>
              <strong>Class ID:</strong> {qrData.classID}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
