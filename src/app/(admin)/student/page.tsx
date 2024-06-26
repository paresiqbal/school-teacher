// next
import Link from "next/link";

// components
import StudentRegister from "./StudentRegister";
import StudentList from "@/components/common/StudentList";

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

export default function StudentPage() {
  return (
    <div className="p-10">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/adminDashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Siswa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-8">
        <h1 className="text-3xl font-bold">Manajemen Siswa.</h1>
        <p>membuat akun dan kelola data siswa.</p>
      </div>
      <Card className="my-5">
        <StudentRegister />
      </Card>
      <Card className="rounded-xl border mx-auto my-5 bg-card text-card-foreground shadow col-span-3">
        <StudentList />
      </Card>
    </div>
  );
}
