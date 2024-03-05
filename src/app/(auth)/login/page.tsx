"use client";

// next
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// zod
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

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    const values = form.getValues();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: "/dashboard",
      });

      if (!res?.error) {
        push("/dashboard");
      } else {
        console.log("error", res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center min-h-screen">
      <div className="mx-auto flex p-5 lg:mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username and password below
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
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
              Login
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Dont have account ?</p>
          <p className="text-sm text-muted-foreground underline underline-offset-4">
            Contact admin @superadmin
          </p>
        </div>
      </div>
    </div>
  );
}
