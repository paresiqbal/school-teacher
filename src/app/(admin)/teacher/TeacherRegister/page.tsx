"use client";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  fullname: z.string().min(1, {
    message: "Full name is required.",
  }),
});

export default function TeacherRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
    },
  });

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    // Adding the role "teacher" to the registration values
    const registrationValues = { ...values, role: "teacher" };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationValues),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      console.log("Registration values:", values);

      setTimeout(() => {
        toast("Registration successful", {
          description: "You can now log in with your new account.",
        });
      }, 1000); // Remove setTimeout when implementing your actual API call
    } catch (error) {
      console.error("Registration failed:", error);
      toast("Registration failed", {
        description: "Please check your details and try again.",
      });
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="w-full flex-col justify-center">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Register an teacher account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username, password and full name to register an teacher
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegistration)}
            className="space-y-2"
          >
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
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
