"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function DeleteForm({ id }: { id: string }) {
  const deleteStudent = async () => {
    try {
      const response = await fetch(
        `https://express.smkn1rl.sch.id/student/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Handle successful deletion
        // e.g., display a success message, refresh the list of students, etc.
        console.log("Student deleted successfully", data);
        toast.success("Student deleted successfully.");
      } else {
        // Handle errors, e.g., student not found, server error, etc.
        console.error("Failed to delete the student", data);
        alert(`Error: ${data.type}`);
      }
    } catch (error) {
      console.error("Error deleting student", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="p-5">
      <Toaster />
      <div className="py-4">
        <h3 className="text-red-500">Zona berbahaya</h3>
        <p>Hati-hati dalam menghapus siswa</p>
      </div>
      <Button variant="destructive" onClick={deleteStudent}>
        Hapus Siswa
      </Button>
    </Card>
  );
}
