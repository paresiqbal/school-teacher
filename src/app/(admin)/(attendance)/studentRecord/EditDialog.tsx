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
import { toast } from "sonner";
import { Toaster } from "sonner";

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
      toast.success("Student status update.");
      return true;
    } else {
      toast.error("Student failed to update status.");
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const submitUpdate = async () => {
    const success = await updateAttendance(attendanceId, studentId, isPresent);
    if (success) {
      onUpdate(attendanceId, studentId, isPresent);
      setIsOpen(false);
    } else {
      // Optionally handle failure
    }
  };

  return (
    <div>
      <Toaster richColors />
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
          <div className="flex gap-20">
            <Label htmlFor="presence">Presence Status</Label>
            <select
              id="presence"
              value={isPresent}
              onChange={(e) => setIsPresent(e.target.value)}
              className="col-span-3 py-1.5 px-6 rounded-md bg-zinc-900"
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
