// next
import { useEffect, useState } from "react";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    fetchMajors();
  }, []);

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

  return (
    <div className="flex flex-col">
      <div className="text-center pb-4">
        <h2 className="underline">Create a Class</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createClass)} className="space-y-2">
          <div className="flex flex-col">
            <label
              htmlFor="level"
              className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Class Level:
            </label>
            <select
              {...form.register("level")}
              className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-3"
            >
              <option value="">Select Level</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="majorId"
              className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Major:
            </label>
            <select
              {...form.register("majorId")}
              className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-3"
            >
              <option value="">Select Major</option>
              {majors.map((major) => (
                <option key={major._id} value={major._id}>
                  {major.majorName}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">
            {isSubmitting ? "Creating..." : "Create Class"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
