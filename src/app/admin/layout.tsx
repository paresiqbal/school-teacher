// components
import Navbar from "@/components/Navbar";

// context api
import { AuthContextProvider } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <div className="p-4 lg:p-10">{children}</div>
      </AuthContextProvider>
    </>
  );
}
