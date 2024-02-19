"use client";

// next
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {};

  return (
    <div className="max-w-md mx-auto my-8 lg:max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl font-bold">
            Sign In
          </CardTitle>
          <CardDescription className="text-sm">
            Enter your email and password below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormItem className="flex flex-col gap-2">
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="e.g., username"
                    {...form.register("username")}
                  />
                </FormControl>
              </FormItem>
              <FormItem className="flex flex-col gap-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="e.g., password"
                    {...form.register("password")}
                  />
                </FormControl>
              </FormItem>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center py-5">
        <p>Contact admin if forgot password and username</p>
        <p>@admin</p>
      </div>
    </div>
  );
}
