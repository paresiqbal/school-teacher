"use client";

// next
import { useRouter } from "next/navigation";

// auth
import { useAuth } from "@/context/AuthContext";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserErrors } from "@/enumError";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Destructure the login function from useAuth
  const form = useForm({
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

      // Call the login function from the context with the token and role
      login(response.data.token, response.data.role);
      console.log("Login success");

      // Redirect to different page based on role
      if (response.data.role === "teacher") {
        router.push("/teacher");
      } else if (response.data.role === "admin") {
        router.push("/admin");
      } else {
        console.error("Unknown role:", response.data.role);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Extract the errorType from the response
        const errorType = error.response.data.type;

        // Handle different types of errors
        switch (errorType) {
          case "USER_NOT_FOUND":
          case "WRONG_CREDENTIAL":
            alert("Invalid username or password.");
            break;
          case "SERVER_ERROR":
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
    <div className="flex flex-col items-center justify-center my-10 p-10 gap-20">
      <h1 className="text-2xl lg:text-5xl font-bold text-center">
        SMK NEGERI 1 REJANG LEBONG
      </h1>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username" aria-label="username">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="e.g username"
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
                      <FormLabel htmlFor="password" aria-label="password">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="e.g ******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
    </div>
  );
}
