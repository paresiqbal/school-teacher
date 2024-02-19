// next
import Image from "next/image";

// shadcn
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between my-20 p-10 gap-10">
      <h1 className="text-xl font-bold">SMK NEGERI 1 REJANG LEBONG</h1>
      <div className="flex flex-col min-h-screen gap-10">
        <div>
          <Image
            src="/placeholder.png"
            width={500}
            height={500}
            priority
            style={{ width: "auto", height: "100%" }}
            alt="School image"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">Manage Students Attendance and Grade's</h2>
          <Button>Sign In</Button>
          <p className="text-sm text-center">Contact admin @admin</p>
        </div>
      </div>
    </main>
  );
}
