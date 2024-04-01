"use client";

// next
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
import { useEffect } from "react";

interface UserSession {
  user: {
    fullname?: string | null;
    username?: string | null;
    role?: string;
  };
}

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();

  const { data: session, status } = useSession() as {
    data: UserSession;
    status: string;
  };

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
      });

      if (!res?.error) {
        alert("Login success");
      } else {
        console.log("error", res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log(`Authentication status: ${status}`);
    console.log("Session:", session);

    if (status === "authenticated" && session?.user?.role) {
      switch (session.user.role) {
        case "admin":
          console.log("Redirecting to adminDashboard");
          router.push("/adminDashboard");
          break;
        case "teacher":
          console.log("Redirecting to dashboard");
          router.push("/dashboard");
          break;
        default:
          console.log("Unhandled user role:", session.user.role);
      }
    } else if (status === "unauthenticated") {
      console.log("Redirecting to login");
      router.push("/login");
    }
  }, [status, session, router]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login to an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username and password below
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
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
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/learn.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-fit"
        />
      </div>
    </div>
  );
}
