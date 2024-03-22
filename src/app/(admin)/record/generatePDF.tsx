import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Student {
  fullname: string;
  isPresent: string;
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
    const heading = [
      ["Date", "Subject", "Class", "Teacher"],
      [record.date, record.subject, selectedLevel, teacherName],
    ];
    const body = record.students.map(
      (student: Student, studentIndex: number) => [
        studentIndex + 1,
        student.fullname,
        student.isPresent === "yes" ? "present" : "absent",
      ]
    );

    doc.autoTable({
      head: [["No.", "Student Name", "Presence"]],
      body: body,
      didDrawPage: (data: any) => {
        // This can be used to add a header to each page
        doc.setFontSize(14);
        doc.text(`Attendance Record for ${selectedClass?.majorName}`, 14, 15);
      },
      startY: index === 0 ? 20 : doc.internal.pageSize.height - 10,
    });

    doc.autoTable({
      body: heading,
      theme: "plain",
      startY: doc.lastAutoTable.finalY + 5,
    });
  });

  doc.save("attendance-records.pdf");
};

export default generatePDF;
