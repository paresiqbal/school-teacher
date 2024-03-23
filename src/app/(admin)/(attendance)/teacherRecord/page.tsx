import { useState } from "react";

interface Record {
  _id: string;
  date: string;
  teacher: string;
  class: string;
}

interface TeacherRecordProps {
  attendanceRecords: Record[];
}

const TeacherRecord: React.FC<TeacherRecordProps> = ({ attendanceRecords }) => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered records based on search term
  const filteredRecords = attendanceRecords.filter((record) =>
    // Assuming you want to search by the teacher's ID for simplicity
    // You might need to adjust this to match the teacher's name or other attributes
    // depending on how you manage teacher names in your application
    record.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Teacher Attendance Records</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by teacher ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="records-list">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record._id} className="record-item">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(record.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Teacher ID:</strong> {record.teacher}
              </p>
              <p>
                <strong>Class ID:</strong> {record.class}
              </p>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherRecord;
