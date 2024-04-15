import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner: React.FC = () => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
    };

    const onScanFailure = (error: any) => {
      console.warn(`Code scan error = ${error}`);
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);
    scannerRef.current = html5QrcodeScanner;

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear().then(() => console.log("Scanner stopped."));
    };
  }, []);

  return <div id="reader" style={{ width: "500px", height: "500px" }}></div>;
};

export default Scanner;
