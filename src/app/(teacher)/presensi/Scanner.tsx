import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Scanner({ onScan }: any) {
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null || (null as any));

  const handleScan = (result: any) => {
    if (result) {
      setData(result?.text);
      setShowModal(true);
      qrRef.current.stop();
      onScan(result?.text);
    }
  };

  const resetState = () => {
    setShowModal(false);
  };

  const handleOK = () => {
    resetState();
  };

  return (
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
  );
}
