"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

// shadcn
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

export default function Presensi() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [currentSubject, setCurrentSubject] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const handleSubjectChange = (e: any) => {
    setCurrentSubject(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent form default action (page reload)
    setSubjects((prevSubjects) => [...prevSubjects, currentSubject]);
    setCurrentSubject(""); // Clear the input field
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
                  Enter subject you teach right now.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="subject"
                    value={currentSubject}
                    onChange={handleSubjectChange}
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
      <div className="pt-10">
        <h3>Submitted Subjects:</h3>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
