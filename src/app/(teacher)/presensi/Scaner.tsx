import { useState } from "react";

export default function Scanner({ subject, classId, teacherId }: any) {
  console.log("Received in Scanner:", { subject, classId, teacherId });
  const [scanResult, setScanResult] = useState("");

  const handleScan = async (scannedStudentId: any) => {
    // Construct the payload based on the props and scanned studentId
    const payload = {
      date: new Date().toISOString().split("T")[0],
      teacherId, // Passed as a prop
      subject, // Passed as a prop
      studentId: scannedStudentId, // Set from scanning
      classId, // Passed as a prop
    };

    try {
      const response = await fetch("/api/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // Handle success (e.g., show a success notification)
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      // Handle error (e.g., show an error notification)
    }
  };

  // Function or method to trigger `handleScan` with a `studentId`
  // This would be replaced with actual barcode scanning logic
  const simulateScan = () => {
    const simulatedStudentId = "6600c3442d6a4200275c581c"; // Example studentId
    handleScan(simulatedStudentId);
  };

  return (
    <div className="w-32 h-32 bg-muted/40" onClick={simulateScan}>
      Scan Here
    </div>
  );
}
