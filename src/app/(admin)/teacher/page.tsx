// fetch teacher
import Teacher from "@/app/api/user/teacher/page";

// shadcn
import { Card } from "@/components/ui/card";
import TeacherRegister from "./TeacherRegister/page";

export default function page() {
  const params = {
    slug: [],
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold tracking-tight">Teacher management</h1>
      <p>create and manage teacher data</p>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <TeacherRegister />
      </Card>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <Teacher params={params} />
      </Card>
    </div>
  );
}
