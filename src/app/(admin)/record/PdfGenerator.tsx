import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface PdfGeneratorProps {
  attendanceRecords: IAttendanceRecord[];
}

export interface IStudentAttendance {
  id: string;
  fullname: string;
  isPresent: string;
}

export interface IAttendanceRecord {
  date: string;
  teacher: string;
  subject: string;
  students: IStudentAttendance[];
}

export default function PdfGenerator({ attendanceRecords }: PdfGeneratorProps) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 28);

    let startY = 36; // Starting position for the first record

    attendanceRecords.forEach((record, index) => {
      // If not the first record, add space before the next record
      if (index > 0) startY += 10;

      // Adding Record Header with Date, Teacher, and Subject
      const recordHeader = `Record: ${index + 1} - Date: ${new Date(
        record.date
      ).toLocaleDateString()}, Subject: ${record.subject}`;
      doc.text(recordHeader, 14, startY);

      // Define the columns for the attendance table
      const tableColumn = ["No.", "Student Name", "Presence"];
      const tableRows = record.students.map(
        (student: IStudentAttendance, studentIndex: number) => [
          studentIndex + 1,
          student.fullname,
          student.isPresent,
        ]
      );

      // Generate the table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY + 6, // Start just below the record header
        theme: "grid",
        didDrawPage: () => {
          // Optional: Add hooks for actions after drawing each page
        },
      });

      // Update startY for the next record using finalY from the last table
      startY = (doc as any).lastAutoTable.finalY + 20; // Adjust space between records
    });

    // Save the document
    if (attendanceRecords.length > 0) {
      const firstRecord = attendanceRecords[0];
      const date = new Date(firstRecord.date)
        .toLocaleDateString()
        .replace(/\//g, "-");
      const subject = firstRecord.subject.replace(/\s+/g, "_");
      const documentName = `Attendance_${date}_${subject}.pdf`;
      doc.save(documentName);
    } else {
      // Fallback name if there are no attendance records
      doc.save("Attendance-Report.pdf");
    }
  };

  return { generatePDF };
}
