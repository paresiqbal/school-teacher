"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

// Assuming these components are correctly imported
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
import { Label } from "@/components/ui/label";
import Scaner from "./Scaner";

export default function Presensi() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    subject: "",
    studentId: "",
    classId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { ...formData, teacherId: session?.user?.id };
    console.log("Payload to submit:", payload);

    setFormData({ ...formData, subject: "", studentId: "", classId: "" });
    setIsSubmitted(true);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1>Presensi</h1>
        <h2>{session?.user?.fullname}</h2>
      </div>
      <div className="py-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Check Presensi</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Subject</DialogTitle>
                <DialogDescription>
                  Enter the subject you are teaching right now.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="col-span-3"
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
      <div>
        {isSubmitted && (
          <Scaner
            subject={formData.subject}
            classId={formData.classId}
            teacherId={session?.user?.id}
          />
        )}
      </div>
    </div>
  );
}
