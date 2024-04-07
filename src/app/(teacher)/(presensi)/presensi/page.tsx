"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { usePresensi } from "@/context/PresensiProvider";

export default function PresensiForm() {
  const { data: session }: { data: any; status: string } = useSession();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    subject: "",
  });
  const { setPresensiData } = usePresensi();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPresensiData((prev) => ({
      ...prev,
      date: formData.date,
      subject: formData.subject,
      teacherId: session?.user?.id,
    }));
    router.push("/scanner");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Check Presensi</Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md rounded-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Mata pelajaran</DialogTitle>
              <DialogDescription>
                Masukan mapel yang sedang diajar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="col-span-4"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
