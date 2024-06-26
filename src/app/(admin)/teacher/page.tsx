// next
import Link from "next/link";

// component
import TeacherRegister from "./TeacherRegister";
import TeacherList from "./TeacherList";

// shadcn
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function TeacherPage() {
  return (
    <div className="p-10 bg-background">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/adminDashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Guru</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-8">
        <h1 className="text-3xl font-bold">Manajemen Guru.</h1>
        <p>membuat akun dan kelola data guru.</p>
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
