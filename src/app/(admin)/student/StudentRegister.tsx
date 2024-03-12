"use client";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import QRCode from "qrcode";

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
  nis: z.coerce.number().int().min(4, {
    message: "NIS must be at least 4 digits.",
  }),
  yearEntry: z.coerce.number().int().min(4, {
    message: "Year of entry must be at least 4 digits.",
  }),
});

export default function StudentRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      nis: 0,
      yearEntry: 0,
    },
  });

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    const registrationValues = { ...values, role: "student" };

    try {
      const response = await fetch("http://localhost:3001/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationValues),
      });

      // const studentId = registrationValues.nis;
      // const qrCode = await QRCode.toDataURL(studentId.toString());

      if (!response.ok) {
        throw new Error("Uh oh! Failed to register student.");
      }
      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Uh oh! Something went wrong.", error);
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="w-full flex flex-col p-4 justify-center items-center">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Register an student account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter student details to register an account.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegistration)}
            className="space-y-2"
          >
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="text"
                      id="username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Username must be lowercase and unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      id="password"
                      {...field}
                    />
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
                  <FormLabel>NIS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NIS"
                      type="number"
                      id="nis"
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
                  <FormLabel>Year of Entry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year of Entry"
                      type="number"
                      id="yearEntry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}