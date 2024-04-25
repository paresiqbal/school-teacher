"use client";
import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRData {
  studentID: string;
  name: string;
  nis: string;
  classID: string;
}

const Home: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrData, setQrData] = useState<QRData | null>(null);

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
  });

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
    <div className="text-center">
      <h1>Scanner</h1>
      <div id="reader" ref={qrRef} style={{ width: "400px" }}></div>
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
  );
};

export default Home;
