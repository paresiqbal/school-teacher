import Navbar from "@/components/Navbar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="p-10">{children}</div>
    </>
  );
}
