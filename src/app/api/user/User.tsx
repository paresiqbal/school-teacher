async function GetTeachers() {
  const res = await fetch("http://localhost:3001/user/teachers");

  return res.json();
}

export default async function User() {
  const teachers = await GetTeachers();

  return (
    <>
      {teachers.map((teacher: any) => (
        <div key={teacher.id}>
          <h1>{teacher.username}</h1>
          <p>{teacher.role}</p>
        </div>
      ))}
    </>
  );
}
