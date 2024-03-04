import Link from "next/link";

type TeacherProps = { params: { slug: string[] } };

interface TeacherType {
  id: string;
  username: string;
  fullname: string;
  role: string;
}

async function getTeachersData(): Promise<TeacherType[]> {
  const res = await fetch("http://localhost:3001/user/teachers", {
    cache: "force-cache",
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function TeacherList(params: TeacherProps) {
  const teachers = await getTeachersData();

  return (
    <div className="flex flex-col gap-4">
      {teachers.map((teacher) => (
        <div key={teacher.id}>
          <h2>
            <h2>{teacher.fullname}</h2>
            <Link href={`/teacher/${teacher.id}`}>Edit</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
