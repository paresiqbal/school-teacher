"use client";

// next
import { useEffect, useState } from "react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

// shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name is required.",
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  nis: z.coerce.number().int().min(6, {
    message: "NIS must be at least 6 digits.",
  }),
  yearEntry: z.coerce.number().int().min(4, {
    message: "Year of entry must be at least 4 digits.",
  }),
});

interface ProfileFormProps {
  id: string;
}

interface FormInputs {
  fullname: string;
  username: string;
  password: string;
  nis: string;
  yearEntry: string;
  avatar: string;
}

export default function ProfileForm({ id }: ProfileFormProps) {
  const [initialLoading, setInitialLoading] = useState(true);

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      nis: "",
      yearEntry: "",
      avatar: "",
    },
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/student/student/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        form.reset({
          username: data.username,
          fullname: data.fullname,
          nis: data.nis.toString(),
          yearEntry: data.yearEntry.toString(),
          avatar: data.avatar || "",
        });
        setInitialLoading(false);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudentData();
  }, [id, form]);

  const updateStudent: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateStudent)} className="space-y-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    type="text"
                    id="fullname"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register Student
          </Button>
        </form>
      </Form>
    </div>
  );
}
