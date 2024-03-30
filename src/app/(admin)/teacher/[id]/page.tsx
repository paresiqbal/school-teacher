"use client";

// next
import Link from "next/link";

// shadcn
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TeacherProfile from "./TeacherProfile";

interface Iid {
  id: string;
}

export default function TeacherDetails({ params }: { params: Iid }) {
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
              <Link href="/teacher">Teacher</Link>
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
          <TeacherProfile id={params.id} />
        </TabsContent>
        <TabsContent value="qrcode"></TabsContent>
        <TabsContent value="delete">
          <div className="py-4">
            <h3>Danger zone</h3>
            <p>Be careful about deleting students</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
