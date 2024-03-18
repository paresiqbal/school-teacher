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
        <div className="flex h-screen">
          {/* Fixed Sidebar */}
          <div className="fixed inset-y-0 left-0 overflow-y-auto">
            <Sidebar />
          </div>

          {/* Main Content */}
          {/* Adjust the margin-left based on the width of your sidebar */}
          <div className="w-full h-full overflow-y-scroll ml-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
