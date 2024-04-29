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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "sonner";

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
        throw new Error("Gagal Mendaftar");
      }

      const responseData = await response.json();
      toast.success("Guru berhasil terdaftar.");
    } catch (error) {
      toast.error("Guru gagal terdaftar.");
    }
  };

  return (
    <div className="flex flex-col p-8 justify-center items-center">
      <Toaster richColors />
      <div className="w-full flex-col justify-center">
        <div className="pb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Daftarkan akun guru.
          </h2>
          <p className="text-sm text-muted-foreground">
            Masukkan detail guru untuk mendaftarkan akun.
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
                  <FormLabel htmlFor="fullname">Nama Lengkap</FormLabel>
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
                  <FormLabel htmlFor="nip">NIP</FormLabel>
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
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g pahreza.guru.id"
                      type="text"
                      id="username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Nama pengguna harus huruf kecil dan unik.
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
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
              Daftarkan Guru
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
