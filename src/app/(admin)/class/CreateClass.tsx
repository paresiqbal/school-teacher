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
}
