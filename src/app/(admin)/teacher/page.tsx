// component
import TeacherList from "./TeacherList";
import TeacherRegister from "./TeacherRegister";

// shadcn
import { Card } from "@/components/ui/card";

export default function page() {
  const params = {
    slug: [],
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Teacher management</h1>
      <p>create and manage teacher data</p>
      <Card className="my-5 bg-card">
        <TeacherRegister />
      </Card>
      <Card className="rounded-xl border p-5 mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <TeacherList params={params} />
      </Card>
    </div>
  );
}
