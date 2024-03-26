interface Iid {
  id: string;
}

export default function DetailAttendance({ params }: { params: Iid }) {
  const { id } = params;

  return (
    <div>
      <h1>{}</h1>
    </div>
  );
}
