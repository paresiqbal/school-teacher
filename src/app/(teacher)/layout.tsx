import Navbar from "@/components/Navbar";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <div>
          <div>
            <Navbar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
