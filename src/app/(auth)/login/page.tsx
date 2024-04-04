"use client";

// next
import { signIn, useSession } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { ReactEventHandler, useState } from "react";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session }: { data: any } = useSession();

  const handleLogin = async () => {
    const values = form.getValues();

    try {
      const res = await signIn("credentials", {
        reriect: false,
        username: values.username,
        password: values.password,
        callbackUrl: "/adminDashboard",
      });

      if (!res?.error) {
        if (session?.user?.role === "teacher") {
          push("/teacherDashboard");
        } else if (session?.user?.role === "admin") {
          push("/adminDashboard");
        } else {
          push("/");
        }
      } else {
        if (res.status === 401) {
          setError("Username or password is incorrect");
        }
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Masuk kedalam akun.</h1>
            <p className="text-balance text-muted-foreground">
              Masukan username dan password di bawah ini.
            </p>
          </div>
          {error !== "" && <div className="text-red text-2xl">{error}</div>}
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
                Masuk
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Tidak punya akun ?</p>
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Hubungi admin @superadmin
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
          priority
          className="h-full w-full object-fit"
        />
      </div>
    </div>
  );
}
