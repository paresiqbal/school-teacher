import Teacher from "@/app/api/user/teacher/page";

export default function Dashboard() {
  const params = {
    slug: [],
  };

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <Teacher params={params} />
    </div>
  );
}
