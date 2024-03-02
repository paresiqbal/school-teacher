import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TeacherProps = { params: { slug: string[] } };

interface TeacherType {
  _id: string;
  username: string;
  fullname: string;
  role: string;
  // Add more fields as per your product structure
}

async function getTeachersData() {
  const res = await fetch("http://localhost:3001/user/teachers", {
    cache: "force-cache",
    next: {
      revalidate: 3,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

export default async function getTeachers(props: TeacherProps) {
  const { params } = props;
  const teachers = await getTeachersData();

  console.log(teachers);

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h3 className="font-semibold leading-none tracking-tight">
          {params.slug ? "Recent Teachers" : "Teachers Page"}
        </h3>
        <p className="text-sm text-muted-foreground">Teacher table</p>
      </div>
      {teachers.length > 0 &&
        teachers.map((teacher: TeacherType) => (
          <div key={teacher._id} className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <h2 className="text-sm font-medium leading-none">
                {teacher.fullname}
              </h2>
              <p className="text-sm text-muted-foreground">
                {teacher.username}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
