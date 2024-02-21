// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Student() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Add New Student +</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl lg:text-3xl font-bold">
                Sign Up
              </CardTitle>
              <CardDescription className="text-sm">
                Enter your username and password below to sign up.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
