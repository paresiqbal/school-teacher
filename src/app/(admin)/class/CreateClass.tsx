import { useEffect, useState } from "react";

interface IMajor {
  _id: string;
  majorName: string;
}

export default function CreateClasses() {
  const [majors, setMajors] = useState<IMajor[]>([]);
  const [level, setLevel] = useState("");
  const [majorId, setMajorId] = useState("");

  // fetch all majors
  useEffect(() => {
    const getMajors = async () => {
      try {
        const response = await fetch("http://localhost:3001/class/majors");
        const majorData = await response.json();
        setMajors(majorData);
      } catch (error) {
        console.error("Failed to fetch majors:", error);
      }
    };

    getMajors();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const classValues = { level, majorId };

    try {
      const response = await fetch("http://localhost:3001/class/addclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classValues),
      });

      if (!response.ok) {
        throw new Error("Failed to create class. Please try again.");
      }

      const classData = await response.json();
      console.log("Class created:", classData);

      // Reset form or handle success
    } catch (error) {
      console.error("Uh oh! Something went wrong.", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center pb-4">
        <h2 className="underline">Create a Class</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-[180px]"
        >
          <option value="" disabled>
            Select a Level
          </option>
          <option value="X">X</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
        </select>

        <select
          value={majorId}
          onChange={(e) => setMajorId(e.target.value)}
          className="w-[180px]"
        >
          <option value="" disabled>
            Select a Major
          </option>
          {majors.map((major) => (
            <option key={major._id} value={major._id}>
              {major.majorName}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full">
          Create Class
        </button>
      </form>
    </div>
  );
}
