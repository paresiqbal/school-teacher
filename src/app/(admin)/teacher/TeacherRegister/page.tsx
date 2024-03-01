"use client";

// next
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
    },
  });

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    console.log("Registration values:", values);
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center min-h-screen">
      <div className="mx-auto flex p-5 lg:mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Register an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below
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
