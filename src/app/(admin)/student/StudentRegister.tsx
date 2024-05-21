"use client";

// next
import { useEffect, useState } from "react";

// library
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "sonner";

interface IClass {
  _id: string;
  level: string;
  majorName: string;
}

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Nama lengkap wajib diisi.",
  }),
  username: z.string().min(4, {
    message: "Nama pengguna minimal harus 4 karakter.",
  }),
  password: z.string().min(6, {
    message: "Kata sandi minimal harus 6 karakter.",
  }),
  nis: z.coerce.number().int().min(6, {
    message: "NIS minimal harus 6 digit.",
  }),
  yearEntry: z.coerce.number().int().min(4, {
    message: "Tahun masuk minimal harus 4 digit.",
  }),
  classId: z.string(),
});

export default function StudentRegister() {
  const [classes, setClasses] = useState<IClass[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      nis: 0,
      classId: "",
      yearEntry: 0,
    },
  });

  const studentRegister = async (values: z.infer<typeof formSchema>) => {
    const registrationValues = { ...values, role: "student" };

    try {
      const response = await fetch(`${process.env.API_STUDENT_REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationValues),
      });

      if (!response.ok) {
        throw new Error("Uh oh! Gagal mendaftarkan siswa.");
      }

      form.reset({
        fullname: "",
        username: "",
        password: "",
        nis: 0,
        classId: "",
        yearEntry: 0,
      });

      response.json();
      toast.success("Siswa berhasil terdaftar.");
    } catch (error) {
      toast.error("Siswa gagal terdaftar.");
    }
  };

  useEffect(() => {
    async function fetchClasses() {
      const response = await fetch(`${process.env.API_CLASSES}`);
      if (!response.ok) throw new Error("Failed to fetch classes");

      const data = await response.json();
      setClasses(data);
    }

    fetchClasses().catch((error) =>
      console.error("Fetch classes error:", error)
    );
  }, []);

  return (
    <div className="flex flex-col p-8 justify-center items-center">
      <div className="w-full flex flex-col">
        <div className="pb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Daftarkan akun pelajar.
          </h2>
          <p className="text-sm text-muted-foreground">
            Masukkan detail siswa untuk mendaftarkan akun.
          </p>
        </div>
        <Toaster richColors />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(studentRegister)}
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
                      placeholder="e.g Pahreza Iqbal"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g pahreza.siswa.id"
                      autoComplete="username"
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
            <FormField
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="nis">NIS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NIS"
                      type="number"
                      id="nis"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Nis harus 6 digit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearEntry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="yearEntry">Tahun Masuk</FormLabel>
                  <FormControl>
                    <Input type="number" id="yearEntry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel
                    htmlFor="classId"
                    className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Kelas
                  </FormLabel>
                  <FormControl>
                    <Select
                      // {...field}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      name="classId"
                    >
                      <SelectTrigger id="classId">
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent id="classId">
                        {classes.map((kelas) => (
                          <SelectItem key={kelas._id} value={kelas._id}>
                            {kelas.level} {kelas.majorName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold">
              Daftarkan Siswa
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
