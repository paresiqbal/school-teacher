// next
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>SMK Negeri 1 Rejang Lebong</h1>
      <div>
        <h2>Manage Students Attendance and Grade's</h2>
        <input type="text" />
        <p>Contact admin @admin</p>
      </div>
      <div>
        <Image
          src="/placeholder.png"
          width={500}
          height={500}
          priority
          style={{ width: "auto", height: "100%" }}
          alt="Picture of the author"
        />
      </div>
    </main>
  );
}
