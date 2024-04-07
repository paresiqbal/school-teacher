"use client";

// next
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function ScannerPresensi() {
  const { data: session }: { data: any; status: string } = useSession();

  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null || (null as any));

  const handleScan = (result: any) => {
    if (result) {
      setData(result?.text);
      setShowModal(true);
      qrRef.current.stop();
    }
  };

  const resetState = () => {
    setShowModal(false);
  };

  const handleOK = () => {
    resetState();
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1>Presensi</h1>
        <h2>{session?.user?.fullname}</h2>
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
              <p>{data}</p>
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
