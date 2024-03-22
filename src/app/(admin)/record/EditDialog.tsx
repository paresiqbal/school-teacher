"use client";
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
import { Label } from "@/components/ui/label";

interface IAttendance {
  attendanceId: string;
  studentId: string;
  isPresent: string;
}

interface IEditDialogProps {
  attendanceId: string;
  studentId: string;
  currentPresence: string;
}

async function updateAttendance(
  attendanceId: string,
  studentId: string,
  isPresent: string
): Promise<boolean> {
  try {
    // Correctly structure the JSON body
    const res = await fetch(
      "http://localhost:3001/attendance/edit-attendance-record",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceId, studentId, isPresent }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert(data.message); // Success message
      return true;
    } else {
      alert(data.message); // Error message from server
      return false;
    }
  } catch (error) {
    console.error("Failed to update attendance", error);
    return false;
  }
}

export default function EditDialog({
  attendanceId,
  studentId,
  currentPresence,
}: IEditDialogProps) {
  const [isPresent, setIsPresent] = useState<string>(currentPresence);

  const submitUpdate = async () => {
    const success = await updateAttendance(attendanceId, studentId, isPresent);
    if (success) {
      // Handle success (e.g., close dialog, refresh data)
    } else {
      // Optionally handle failure
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-yellow-400">Edit Presence</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Presence Status</DialogTitle>
            <DialogDescription>
              Update the student presence status.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="presence">Presence Status</Label>
            <select
              id="presence"
              value={isPresent}
              onChange={(e) => setIsPresent(e.target.value)}
              className="col-span-3"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="excuse">excuse</option>
            </select>
          </div>
          <DialogFooter>
            <Button onClick={submitUpdate}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
