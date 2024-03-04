type ParamsType = {
  id: string;
};

async function getTeacherDetails(id: string) {
  const res = await fetch("http://localhost:3001/user/teacher/" + id, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function TeacherDetails({
  params,
}: {
  params: ParamsType;
}) {
  const teacher = await getTeacherDetails(params.id);
  return (
    <div>
      <h1>{teacher.fullname}</h1>
    </div>
  );
}
