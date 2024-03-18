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
        <main className="flex">
          <Sidebar />
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
