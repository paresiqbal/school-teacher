import Teacher from "@/app/api/user/teacher/page";

export default function page() {
  const params = {
    slug: [],
  };

  return (
    <div>
      <h1>Teacher Data</h1>
      <Teacher params={params} />
    </div>
  );
}
