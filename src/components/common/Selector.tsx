import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdOutlineDateRange } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IClass {
  _id: string;
  level: string;
  majorName: string;
}

interface SelectorProps {
  classes: IClass[];
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedClass: IClass | null;
  setSelectedClass: (cls: IClass | null) => void;
  date: Date | undefined;
  setDate: (date: Date) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleFetchAttendance: () => void;
}

export default function Selector({
  classes,
  selectedLevel,
  setSelectedLevel,
  selectedClass,
  setSelectedClass,
  date,
  setDate,
  selectedDate,
  setSelectedDate,
  handleFetchAttendance,
}: SelectorProps) {
  return (
    <div className="bg-background rounded-lg shadow-lg space-y-6 w-full">
      <div>
        <label
          htmlFor="level-select"
          className="mb-2 text-sm font-medium text-gray-400"
        >
          Tingkat
        </label>
        <div className="text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block pt-2 w-full">
          <Select
            value={selectedLevel}
            onValueChange={(level) => {
              setSelectedLevel(level);
              setSelectedClass(null);
            }}
          >
            <SelectTrigger id="level-select" aria-label="Select Level">
              <SelectValue placeholder="Pilih tingkatan" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(classes.map((cls) => cls.level))).map(
                (level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label
          htmlFor="major-select"
          className="mb-2 text-sm font-medium text-gray-400"
        >
          Kelas
        </label>
        <div className="text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pt-2">
          <Select
            value={selectedClass?._id || ""}
            onValueChange={(value) => {
              const classId = value;
              const cls = classes.find((c) => c._id === classId) || null;
              setSelectedClass(cls);
            }}
            disabled={!selectedLevel}
          >
            <SelectTrigger aria-label="Select Major">
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              {classes
                .filter((cls) => cls.level === selectedLevel)
                .map((cls) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.majorName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-400"
        >
          Tanggal
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !date ? "text-gray-400" : "text-white"
              }`}
              disabled={!selectedClass}
            >
              <MdOutlineDateRange className="mr-2" />
              {date ? format(date, "PPP") : "Pilih tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setSelectedDate(format(newDate, "yyyy-MM-dd"));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label
          htmlFor="search"
          className="block mb-2 text-sm font-medium text-gray-400"
        >
          Cari
        </label>
        <Button
          onClick={handleFetchAttendance}
          disabled={!selectedClass || !selectedDate}
          className="w-full"
        >
          Cari
        </Button>
      </div>
    </div>
  );
}
