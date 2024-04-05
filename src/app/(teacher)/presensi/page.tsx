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

export default function Presensi() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [subjectSubmitted, setSubjectSubmitted] = useState(false); // Track if the subject has been submitted
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Today's date
    subject: "",
    studentId: "",
    classId: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitSubject = async (e: any) => {
    e.preventDefault();
    // On successful submission, you'll likely want to actually send this data somewhere
    // For now, we'll just simulate successful submission by logging and setting the flag
    console.log("Submitting subject and teacherId:", formData);

    // Here, you would typically make a fetch request to your backend to submit the data
    // Assuming the submission is successful, set the subject as submitted
    setSubjectSubmitted(true);

    // Optionally clear the subject from formData if you don't need it for the next step
    // setFormData({ ...formData, subject: "" });
  };

  const handleSubmitStudent = async (e: any) => {
    e.preventDefault();
    // Submit studentId and classId, similar to handleSubmitSubject
    console.log("Submitting studentId and classId:", formData);

    // Reset the form or perform other actions as needed after submission
    setFormData({
      date: new Date().toISOString().split("T")[0],
      subject: "",
      studentId: "",
      classId: "",
    });
    // Reset the subjectSubmitted flag if you want to allow re-submission
    setSubjectSubmitted(false);
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
            {!subjectSubmitted ? (
              <form onSubmit={handleSubmitSubject}>
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
            ) : (
              <form onSubmit={handleSubmitStudent}>
                <DialogHeader>
                  <DialogTitle>Student Information</DialogTitle>
                  <DialogDescription>
                    Enter the students information.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentId" className="text-right">
                      Student ID
                    </Label>
                    <Input
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="classId" className="text-right">
                      Class ID
                    </Label>
                    <Input
                      id="classId"
                      name="classId"
                      value={formData.classId}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
