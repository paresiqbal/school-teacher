// shadcn
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./ProfileForm";

interface Iid {
  id: string;
}

export default function StudentDetails({ params }: { params: Iid }) {
  const { id } = params;

  return (
    <div className="p-10">
      <div className="pb-10">
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
          <TabsTrigger value="password">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="Profile">
          <ProfileForm id={params.id} />
        </TabsContent>
        <TabsContent value="Qrcode"></TabsContent>
        <TabsContent value="Delete"></TabsContent>
      </Tabs>
    </div>
  );
}
