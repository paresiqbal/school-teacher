"use state";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IMajor {
  _id: string;
  majorName: string;
}

interface PopClassProps {
  onMajorSelected: (majorId: string) => void;
}

async function getMajorsData(): Promise<IMajor[]> {
  const res = await fetch("http://localhost:3001/class/majors");
  // Ensure you have error handling here for production code
  return res.json();
}

export default function PopClass({ onMajorSelected }: PopClassProps) {
  const [open, setOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [majors, setMajors] = useState<IMajor[]>([]);

  useEffect(() => {
    getMajorsData().then(setMajors);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedMajor
            ? majors.find((major) => major._id === selectedMajor)?.majorName
            : "Select major..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search major..." />
          <CommandList>
            {majors.length === 0 && (
              <CommandEmpty>No major found.</CommandEmpty>
            )}
            <CommandGroup>
              {majors.map((major) => (
                <CommandItem
                  key={major._id}
                  value={major.majorName}
                  onSelect={() => {
                    const newMajorId =
                      major.majorName === selectedMajor ? "" : major.majorName;
                    console.log(
                      "About to select major in PopClass:",
                      newMajorId
                    );
                    setSelectedMajor(newMajorId);
                    setOpen(false);
                    onMajorSelected(newMajorId);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMajor === major.majorName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {major.majorName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
