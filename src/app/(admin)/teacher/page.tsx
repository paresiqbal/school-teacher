import Teacher from "@/app/api/user/teacher/page";

export default function page() {
  const params = {
    slug: [],
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl">Teacher Data</h1>
      <div className="flex items-center justify-center my-10">
        <Teacher params={params} />
      </div>
    </div>
  );
}
