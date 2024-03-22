import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Student {
  fullname: string;
  isPresent: string; // "yes", "no", or "excuse"
}

interface Record {
  date: string;
  subject: string;
  students: Student[];
}

interface Class {
  majorName: string;
}

export const generatePDF = (
  attendanceRecords: Record[],
  teacherNames: string[],
  selectedLevel: string,
  selectedClass: Class | null
) => {
  const doc = new jsPDF() as jsPDF & { autoTable: any; lastAutoTable: any };

  attendanceRecords.forEach((record: Record, index: number) => {
    const teacherName = teacherNames[index] || "N/A";
    // First table for record details
    const detailsTableBody = [
      ["Date:", record.date],
      ["Subject:", record.subject],
      ["Class:", `${selectedLevel} - ${selectedClass?.majorName || ""}`],
      ["Teacher:", teacherName],
    ];

    // Check if not the first record, add a page
    if (index > 0) {
      doc.addPage();
    }

    doc.autoTable({
      head: [["Record Information", ""]],
      body: detailsTableBody,
      theme: "plain",
      startY: 10,
    });

    let startY = doc.lastAutoTable.finalY + 10; // Start Y position for the next table

    // Second table for students
    const studentTableBody = record.students.map(
      (student: Student, studentIndex: number) => [
        studentIndex + 1,
        student.fullname,
        student.isPresent === "yes"
          ? "Present"
          : student.isPresent === "no"
          ? "Absent"
          : "Excused", // Handling all three presence statuses
      ]
    );

    doc.autoTable({
      head: [["No.", "Student Name", "Presence"]],
      body: studentTableBody,
      startY: startY,
    });
  });

  doc.save("attendance-records.pdf");
};
