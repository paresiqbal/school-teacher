import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Student {
  id: string;
  fullname: string;
  isPresent: string; // "present", "excuse", "absent"
  _id: string;
}

interface AttendanceRecord {
  _id: string;
  date: string;
  subject: string;
  students: Student[];
}

interface Class {
  majorName: string;
}

export const generatePDF = (
  attendanceRecords: AttendanceRecord[],
  teacherNames: string[],
  selectedLevel: string,
  selectedClass: Class | null
) => {
  const doc = new jsPDF() as jsPDF & { autoTable: any; lastAutoTable: any };

  const mapPresence = (isPresent: string) => {
    switch (isPresent.toLowerCase()) {
      case "present":
        return "Present";
      case "absent":
        return "Absent";
      case "excuse":
        return "Excused";
      default:
        return "Unknown";
    }
  };

  attendanceRecords.forEach((record: AttendanceRecord, index: number) => {
    const teacherName = teacherNames[index] || "N/A";
    const startY = index > 0 ? doc.lastAutoTable.finalY + 10 : 10;

    // Add a new page for each record after the first
    if (index > 0) doc.addPage();

    // Table for record details
    doc.autoTable({
      head: [["Record Details", ""]],
      body: [
        ["Date", record.date],
        ["Subject", record.subject],
        ["Class", `${selectedLevel} - ${selectedClass?.majorName || ""}`],
        ["Teacher", teacherName],
      ],
      theme: "plain",
      startY,
    });

    // Students table
    const studentTableBody = record.students.map(
      (student: Student, studentIndex: number) => [
        studentIndex + 1,
        student.fullname,
        mapPresence(student.isPresent),
      ]
    );

    doc.autoTable({
      head: [["No.", "Student Name", "Presence"]],
      body: studentTableBody,
      startY: doc.lastAutoTable.finalY + 10,
    });
  });

  doc.save("attendance-records.pdf");
};
