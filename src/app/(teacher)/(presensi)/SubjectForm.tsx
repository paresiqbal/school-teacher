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

export default function SubjectForm() {
  const { data: session }: { data: any; status: string } = useSession();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    subject: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { ...formData, teacherId: session?.user?.id };
    console.log("Payload to submit:", payload);

    setFormData({ ...formData, subject: "" });
    setIsSubmitted(true);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Cek Presensi</Button>
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
              <Button type="submit">Kirim</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
