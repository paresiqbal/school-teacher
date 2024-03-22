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
// New Interface for ClassInfo
interface IClassInfo {
  level: string;
  majorName: string;
}

export interface IAttendanceRecord {
  date: string;
  teacher: string;
  subject: string;
  students: IStudentAttendance[];
  classInfo: IClassInfo;
}

export default function PdfGenerator({ attendanceRecords }: PdfGeneratorProps) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 28);

    let startY = 36;

    attendanceRecords.forEach((record, index) => {
      const { date, teacher, subject, classInfo } = record;
      const { level, majorName } = classInfo; // Destructure classInfo here

      if (index > 0) startY += 10;

      const recordHeaderDetails = [
        `Date: ${new Date(date).toLocaleDateString()}`,
        `Subject: ${subject}`,
        `Level: ${level}`,
        `Major: ${majorName}`,
        `Teacher: ${teacher}`,
      ].join(", ");
      doc.text(recordHeaderDetails, 14, startY);

      const tableColumn = ["No.", "Student Name", "Presence"];
      const tableRows = record.students.map(
        (student: IStudentAttendance, studentIndex: number) => [
          studentIndex + 1,
          student.fullname,
          student.isPresent,
        ]
      );

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY + 6,
        theme: "grid",
        didDrawPage: () => {},
      });

      startY = (doc as any).lastAutoTable.finalY + 20;
    });

    if (attendanceRecords.length > 0) {
      const firstRecord = attendanceRecords[0];
      const date = new Date(firstRecord.date)
        .toLocaleDateString()
        .replace(/\//g, "-");
      const subject = firstRecord.subject.replace(/\s+/g, "_");
      const documentName = `Attendance_${date}_${subject}.pdf`;
      doc.save(documentName);
    } else {
      doc.save("Attendance-Report.pdf");
    }
  };

  return { generatePDF };
}
