"use client";

// next
import { useRouter } from "next/navigation";

// libaries
import axios from "axios";

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
import { UserErrors } from "@/enumError";

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

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        values
      );

      // save token to local storage
      localStorage.setItem("token", response.data.token);
      console.log("Login success");
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorType = error.response.data.type as UserErrors;

        // checking error type
        switch (errorType) {
          case UserErrors.USER_NOT_FOUND:
          case UserErrors.WRONG_CREDENTIAL:
            alert("Invalid username or password.");
            break;
          case UserErrors.SERVER_ERROR:
            alert("Server error. Please try again later.");
            break;
          default:
            alert("An unexpected error occurred.");
        }
        console.error("Login error:", error.response.data.error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
