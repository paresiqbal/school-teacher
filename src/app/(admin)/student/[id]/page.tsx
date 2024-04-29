//next
import Link from "next/link";

// components
import ProfileForm from "./ProfileForm";
import DeleteForm from "./DeleteForm";

// library
import QrForm from "./QrForm";

// shadcn
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Iid {
  id: string;
}

export default function StudentDetails({ params }: { params: Iid }) {
  const { id } = params;

  return (
    <div className="p-10">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/student">Siswa</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola data akun siswaa dan atur preferensi siswa.
        </p>
        <Separator className="my-4" />
      </div>
      <Tabs defaultValue="Profile" className="flex flex-col">
        <TabsList className="grid w-full grid-cols-3 col-span-3">
          <TabsTrigger value="Profile">Profil</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          <TabsTrigger value="delete">Hapus</TabsTrigger>
        </TabsList>
        <TabsContent value="Profile">
          <Card>
            <ProfileForm id={params.id} />
          </Card>
        </TabsContent>
        <TabsContent value="qrcode">
          <QrForm id={params.id} />
        </TabsContent>
        <TabsContent value="delete">
          <div className="py-4">
            <h3 className="text-red-500">Zona berbahaya</h3>
            <p>Hati-hati dalam menghapus siswa</p>
          </div>
          <DeleteForm id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
