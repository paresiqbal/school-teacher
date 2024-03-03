type ParamsType = {
  id: string;
};

async function getStudentsDetails(id: string) {
  const res = await fetch("http://localhost:4000/students/" + id, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function StudentDetails({
  params,
}: {
  params: ParamsType;
}) {
  const student = await getStudentsDetails(params.id);
  return (
    <div>
      <h1>{student.fullname}</h1>
    </div>
  );
}
