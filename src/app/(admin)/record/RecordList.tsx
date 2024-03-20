"use client";

// next
import { useEffect, useState } from "react";

interface IClass {
  _id: string;
  level: string;
  majorName: string;
}

async function getClassesData(): Promise<IClass[]> {
  const res = await fetch("http://localhost:3001/class/classes", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default function RecordList() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<IClass[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");

  const handleSearch = () => {
    // Assuming there's only one class per level and major combination
    const foundClass = filteredClasses.find(
      (kelas) => kelas.majorName === selectedMajor
    );
    if (foundClass) {
      alert(`Found Class ID: ${foundClass._id}`);
    } else {
      alert("No class found with the selected criteria.");
    }
  };

  useEffect(() => {
    const filtered = classes.filter((kelas) => kelas.level === selectedLevel);
    setFilteredClasses(filtered);

    setSelectedMajor("");
  }, [selectedLevel, classes]);

  useEffect(() => {
    getClassesData().then(setClasses);
  }, []);

  return (
    <div>
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
      </select>

      <select
        value={selectedMajor}
        onChange={(e) => setSelectedMajor(e.target.value)}
      >
        <option value="">Select Major</option>
        {filteredClasses.map((kelas) => (
          <option key={kelas._id} value={kelas.majorName}>
            {kelas.majorName}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
