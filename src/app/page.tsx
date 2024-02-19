"use client";

// next
import Image from "next/image";
import { useRouter } from "next/navigation";

// shadcn
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center my-10 gap-20">
      <h1 className="text-2xl lg:text-5xl font-bold text-center">
        SMK NEGERI 1 REJANG LEBONG
      </h1>
      <div className="flex flex-col lg:flex-row w-full items-center gap-8 lg:gap-20">
        <div className="flex justify-center lg:w-1/2">
          <Image
            src="/placeholder.png"
            width={500}
            height={500}
            priority
            alt="School image"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 items-center lg:items-start lg:w-1/2">
          <h2 className="text-xl lg:text-3xl text-center lg:text-left">
            Manage Students Attendance and Grade's
          </h2>
          <Button
            onClick={() => router.push("/auth")}
            className="w-full lg:w-auto"
          >
            Sign In
          </Button>
          <p className="text-sm lg:text-base text-center lg:text-left">
            Contact admin @admin
          </p>
        </div>
      </div>
    </main>
  );
}
