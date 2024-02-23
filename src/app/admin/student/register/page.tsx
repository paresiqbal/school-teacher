"use client";
// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// library
import axios from "axios";

// shadcn
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserErrors } from "@/enumError";

// schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  fullName: z.string().min(1, {
    message: "Full name is required.",
  }),
  nis: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "NIS must be a positive number.",
    }),
  yearEntry: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine(
      (val) => !isNaN(val) && val >= 1900 && val <= new Date().getFullYear(),
      {
        message: "Year of entry must be between 1900 and the current year.",
      }
    ),
});

export default function RegisterStudent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      nis: 0,
      yearEntry: new Date().getFullYear(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/student/register",
        values
      );
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (
          error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS
        ) {
          alert("Username already exists");
        }
        console.error("Registration error:", errorMessage);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center my-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username" aria-label="Username">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" aria-label="Password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName" aria-label="Full Name">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input id="fullName" placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nis" aria-label="NIS">
                      NIS
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="nis"
                        type="number"
                        placeholder="NIS Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearEntry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="yearEntry" aria-label="Year of Entry">
                      Year of Entry
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="yearEntry"
                        type="number"
                        placeholder="Year of Entry"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <p className="text-gray-600">Already have an account ?</p>
        <a href="/" className="hover:text-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}
