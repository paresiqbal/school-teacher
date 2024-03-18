import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <div className="flex">
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
