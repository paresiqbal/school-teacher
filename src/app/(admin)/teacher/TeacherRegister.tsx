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

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Nama pengguna minimal harus 4 karakter.",
  }),
  password: z.string().min(6, {
    message: "Kata sandi minimal harus 6 karakter.",
  }),
  fullname: z.string().min(1, {
    message: "Nama lengkap wajib diisi.",
  }),
  nip: z.string().min(10, {
    message: "NIP wajib diisi.",
  }),
});

export default function TeacherRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      nip: "",
    },
  });

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    // Adding the role "teacher" to the registration values
    const registrationValues = { ...values, role: "teacher" };

    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationValues),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="w-full flex-col justify-center p-4">
        <div className="pb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Register an teacher account
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter teacher details to register an account.
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
                      placeholder="e.g Pahreza Iqbal S.Kom"
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
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nomor Induk Pegawai"
                      type="text"
                      id="nip"
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
                      placeholder="e.g pahreza.guru"
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
            <Button type="submit" className="w-full font-bold">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
