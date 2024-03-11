"use client";

// library
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
  majorName: z.string().min(3, {
    message: "Major name should be abbreviated.",
  }),
});

export default function CreateMajor() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      majorName: "",
    },
  });

  const createMajor = async (values: z.infer<typeof formSchema>) => {
    const majorValues = { ...values };

    try {
      const response = await fetch("http://localhost:3001/class/addMajor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(majorValues),
      });
      if (!response.ok) {
        throw new Error("Failed to create major. Please try again.");
      }

      const major = await response.json();
      console.log("Major created:", major);
    } catch (error) {
      console.error("Uh oh! Something went wrong.", error);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="text-center pb-4">
        <h2 className="underline">Create an Major</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createMajor)} className="space-y-2">
          <FormField
            control={form.control}
            name="majorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input
                    placeholder="TKJ 1, TBSM 2, etc."
                    type="text"
                    id="majorName"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Major name should be abbreviated.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create major
          </Button>
        </form>
      </Form>
    </div>
  );
}
