import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
