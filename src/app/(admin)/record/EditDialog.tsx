// Import statements remain the same
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
import { Label } from "@/components/ui/label";

interface IEditDialogProps {
  attendanceId: string;
  studentId: string;
  currentPresence: string;
  onUpdate: (
    attendanceId: string,
    studentId: string,
    newStatus: string
  ) => void;
}

// Function to update attendance record in the backend
async function updateAttendance(
  attendanceId: string,
  studentId: string,
  isPresent: string
): Promise<boolean> {
  try {
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
      alert(data.message);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  } catch (error) {
    console.error("Failed to update attendance", error);
    return false;
  }
}

// EditDialog component
export default function EditDialog({
  attendanceId,
  studentId,
  currentPresence,
  onUpdate,
}: IEditDialogProps) {
  const [isPresent, setIsPresent] = useState<string>(currentPresence);

  const submitUpdate = async () => {
    const success = await updateAttendance(attendanceId, studentId, isPresent);
    if (success) {
      onUpdate(attendanceId, studentId, isPresent);
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
              <option value="excuse">Excused</option>
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
