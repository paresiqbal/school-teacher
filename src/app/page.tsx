"use client";

// next
import Image from "next/image";

// shadcn
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center my-10 p-10 gap-20">
      <h1 className="text-3xl lg:text-5xl font-bold text-center">
        SMK NEGERI 1 REJANG LEBONG
      </h1>
      <div className="flex flex-col lg:flex-row w-full items-center gap-8 lg:gap-20">
        <div className="flex justify-center lg:w-1/2 bg-muted/40 rounded-md">
          <Image
            src="/images/awal.svg"
            width={500}
            height={500}
            loading="lazy"
            alt="School image"
            className="rounded-lg w-3/5 h-auto"
          />
        </div>
        <div className="flex flex-col gap-4 items-center lg:items-start lg:w-1/2">
          <h2 className="text-xl lg:text-3xl text-center lg:text-left">
            Kelola data, kehadiran, dan nilai siswa.
          </h2>
          <Button className="w-full lg:w-auto" onClick={() => signIn()}>
            Masuk
          </Button>
          <p className="text-sm lg:text-base text-center lg:text-left">
            Hubungi Admin @superadmin
          </p>
        </div>
      </div>
    </main>
  );
}
