import { useSession } from "next-auth/react";

export default function CheckAttendance() {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <div>
      <h1>{session?.user?.fullname}</h1>
    </div>
  );
}
