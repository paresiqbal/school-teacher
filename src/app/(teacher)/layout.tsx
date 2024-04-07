import Navbar from "@/components/Navbar";
import { PresensiProvider } from "@/context/PresensiProvider";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <PresensiProvider>{children}</PresensiProvider>
      </div>
    </>
  );
}
