// component
import TeacherRegister from "./TeacherRegister";
import TeacherList from "./TeacherList";

// shadcn
import { Card } from "@/components/ui/card";

export default async function TeacherPage() {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Teacher management</h1>
        <p>create and manage teacher data</p>
      </div>
      <Card className="my-5 bg-card">
        <TeacherRegister />
      </Card>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <TeacherList />
      </Card>
    </div>
  );
}
