"use client";

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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IMajor {
  _id: string;
  majorName: string;
}

const formSchema = z.object({
  level: z.enum(["X", "XI", "XII"]),
  majorId: z.string(),
});

export default function CreateClasses() {
  const [majors, setMajors] = useState<IMajor[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: undefined,
      majorId: "",
    },
  });

  // fetch all majors
  useEffect(() => {
    const getMajors = async () => {
      try {
        const response = await fetch("http://localhost:3001/class/majors");

        const majorData = await response.json();
        setMajors(majorData);
      } catch (error) {
        console.error("Failed to fetch majors:", error);
      }
    };

    getMajors();
  }, []);

  const createClass = async (values: z.infer<typeof formSchema>) => {
    const classValues = { ...values };

    try {
      const response = await fetch("http://localhost:3001/class/addclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classValues),
      });
      if (!response.ok) {
        throw new Error("Failed to create major. Please try again.");
      }

      const classData = await response.json();
      console.log("Class created:", classData);
    } catch (error) {
      console.error("Uh oh! Something went wrong.", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center pb-4">
        <h2 className="underline">Create an Class</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createClass)} className="space-y-2">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="X">X</SelectItem>
                        <SelectItem value="XI">XI</SelectItem>
                        <SelectItem value="XII">XII</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="majorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {majors.map((major) => (
                          <SelectItem key={major._id} value={major._id}>
                            {major.majorName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create Class
          </Button>
        </form>
      </Form>
    </div>
  );
}
