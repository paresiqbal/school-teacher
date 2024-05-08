// next
import { useEffect, useState } from "react";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Major {
  _id: string;
  majorName: string;
}

const formSchema = z.object({
  level: z.enum(["X", "XI", "XII"]),
  majorId: z.string(),
});

export default function CreateClass() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
      majorId: "",
    },
  });

  const fetchMajors = async () => {
    try {
      const response = await fetch("http://localhost:3001/class/majors");
      if (!response.ok) throw new Error("Failed to fetch majors.");

      const data: Major[] = await response.json();
      setMajors(data);
    } catch (error) {
      console.error("Failed to fetch majors:", error);
    }
  };

  const createClass = async (values: { level: string; majorId: string }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/class/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error && data.error.includes("already exists")) {
          alert("Class already exists. Please try again.");
        } else {
          throw new Error(
            data.error || "Failed to create class. Please try again."
          );
        }
      } else {
        form.reset({
          level: "",
          majorId: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      alert("Failed to create class. Please try again");
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-center pb-4">
        <h2 className="underline">Buat Kelas</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createClass)} className="space-y-2">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel
                  className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="classLevel"
                >
                  Kelas
                </FormLabel>
                <FormControl>
                  <Select
                    // {...field}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="classLevel"
                      aria-label="Select a class level"
                    >
                      <SelectValue placeholder="Pilih Tingkatan" />
                    </SelectTrigger>
                    <SelectContent id="level">
                      <SelectItem value="X">X</SelectItem>
                      <SelectItem value="XI">XI</SelectItem>
                      <SelectItem value="XII">XII</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="majorId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel
                  htmlFor="majorId"
                  className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Jurusan
                </FormLabel>
                <FormControl>
                  <Select
                    // {...field}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="majorId" aria-label="Select a major">
                      <SelectValue placeholder="Pilih Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem key={major._id} value={major._id}>
                          {major.majorName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isSubmitting ? "Membuat..." : "Buat Kelas"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
