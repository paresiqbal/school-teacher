import { Card } from "@/components/ui/card";
import RecordList from "./RecordList";

export default function AttendanceRecord() {
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold">Attendance Record</h1>
        <p>Display all attendance record of students.</p>
      </div>
      <div className="flex py-10 gap-10">
        <Card className="p-6 w-full">
          <RecordList />
        </Card>
      </div>
    </div>
  );
}
