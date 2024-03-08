// next
import Link from "next/link";

interface Student {
  id: number;
  fullname: string;
  class: string;
}

async function getStudentsData(): Promise<Student[]> {
  const res = await fetch("http://localhost:3001/student/students", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function StudentPage() {
  const students = await getStudentsData();

  return (
    <div>
      {students.map((student) => (
        <div key={student.id}>
          <h2>{student.fullname}</h2>
          <p>{student.class}</p>
          <Link href={`/student/${student.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}
