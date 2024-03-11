"use client";

// react
import { useEffect, useState } from "react";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IMajor {
  _id?: string;
  major: string;
}

const formSchema = z.object({
  level: z.enum(["X", "XI", "XII"]),
  major: z.string().min(3, {
    message: "Major name should be abbreviated.",
  }),
});

export default function CreateClass() {
  const [majors, setMajors] = useState<IMajor[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: undefined,
      major: "",
    },
  });

  // get all majors
  useEffect(() => {
    const getMajors = async () => {
      try {
        const response = await fetch("http://localhost:3001/class/majors");
        if (!response.ok) {
          throw new Error("Failed to fetch majors");
        }

        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error("Uh oh! Something went wrong.", error);
      }
    };

    getMajors();
  }, []);

  // create class
  const createClass = async (values: z.infer<typeof formSchema>) => {
    const classValues = { ...values };

    try {
      const response = await fetch("http://localhost:3001/class/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classValues),
      });

      if (!response.ok) {
        throw new Error("Failed to create class. Please try again.");
      }

      const data = await response.json();
      console.log("Class created:", data);
    } catch (error) {
      console.error("Uh oh! Something went wrong.", error);
    }
  };

  return (
    <div className="flex flex-col p-4 w-full justify-center items-center">
      <div className="text-center pb-4">
        <h2 className="underline">Create an Classes</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createClass)} className="space-y-2">
          <Select>
            <label
              htmlFor="select class"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Class
            </label>
            <SelectTrigger className="w-[600px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="X">X (Sepuluh)</SelectItem>
                <SelectItem value="XI">XI (Sebelas)</SelectItem>
                <SelectItem value="XII">XII (Dua belas)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select {...form.register("major")}>
            <label
              htmlFor="select class"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Major
            </label>
            <SelectTrigger className="w-[600px]">
              <SelectValue placeholder="Select a major" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {majors.map((major) => (
                  <SelectItem key={major._id} value={major.major}>
                    {major.major}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Create class
          </Button>
        </form>
      </Form>
    </div>
  );
}
