"use client";

// next
import { useEffect, useState } from "react";

interface IMajor {
  _id: string;
  majorName: string;
}

async function getMajorsData(): Promise<IMajor[]> {
  const res = await fetch("http://localhost:3001/class/majors", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default function RecordList() {
  const [majors, setMajors] = useState<IMajor[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");

  useEffect(() => {
    getMajorsData().then((data) => {
      setMajors(data);
    });
  });

  return (
    <div>
      <label htmlFor="birthday">Date:</label>
      <input type="date" id="birthday" name="birthday"></input>
      <div>
        <label
          htmlFor="level-select"
          className="block mb-2 text-sm font-medium text-gray-400"
        >
          Level:
        </label>
        <select
          id="level-select"
          className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-3"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="X">X</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="major-select"
          className="block mb-2 text-sm font-medium text-gray-400"
        >
          Major:
        </label>
        <select
          id="major-select"
          className="bg-zinc-900 border border-yellow-400 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-52 p-3"
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
        >
          <option value="">All Majors</option>
          {majors.map((major) => (
            <option key={major._id} value={major.majorName}>
              {major.majorName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
