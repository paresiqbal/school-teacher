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
              <Link href="/student">Student</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Setting</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set user preferences.
        </p>

        <Separator className="my-4" />
      </div>
      <Tabs defaultValue="Profile" className="flex flex-col">
        <TabsList className="grid w-full grid-cols-3 col-span-3">
          <TabsTrigger value="Profile">Profile</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="Profile">
          <ProfileForm id={params.id} />
        </TabsContent>
        <TabsContent value="qrcode">
          <QrForm id={params.id} />
        </TabsContent>
        <TabsContent value="delete">
          <div className="py-4">
            <h3>Danger zone</h3>
            <p>Be careful about deleting students</p>
          </div>
          <DeleteForm id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
