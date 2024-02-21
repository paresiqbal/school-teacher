import Navbar from "@/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-10">{children}</div>
    </>
  );
}
