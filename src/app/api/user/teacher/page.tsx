type TeacherProps = { params: { slug: string[] } };

interface TeacherType {
  _id: string;
  username: string;
  role: string;
  // Add more fields as per your product structure
}

async function getTeachersData() {
  const res = await fetch("http://localhost:3001/user/teachers");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

export default async function getTeachers(props: TeacherProps) {
  const { params } = props;
  const teachers = await getTeachersData();

  console.log(teachers);

  return (
    <>
      <div>
        <h1>{params.slug ? "Detail Teacers" : "Teachers Page"}</h1>
        {teachers.length > 0 &&
          teachers.map((teacher: TeacherType) => (
            <div key={teacher._id}>
              <h2>{teacher.username}</h2>
              <p>{teacher.role}</p>
            </div>
          ))}
      </div>
    </>
  );
}
