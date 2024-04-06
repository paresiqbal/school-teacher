import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { QrReader } from "react-qr-reader";

export default function Scanner() {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null || ("null" as any));

  const handleScan = (result: any, error: any) => {
    if (!!result) {
      setData(result?.text);
      setShowModal(true);
      qrRef.current.stop();
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOK = async () => {
    alert("OK");
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
      <Link
        href={`/`}
        className=" bg-yellow-200 m-4 text-md rounded-md px-4 py-2 hover:underline"
      >
        Back to home..
      </Link>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md p-4">
            <p className="text-xl font-bold mb-2">Scanned data:</p>
            <p>{data}</p>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mx-4 mt-4 hover:bg-gray-300"
              onClick={handleOK}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
