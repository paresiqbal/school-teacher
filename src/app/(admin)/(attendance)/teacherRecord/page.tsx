"use client";

import React, { useState } from "react";

interface Record {
  _id: string;
  date: string;
  teacher: string;
  class: string;
}

interface TeacherRecordProps {
  attendanceRecords?: Record[]; // Marking as optional
}

const TeacherRecord: React.FC<TeacherRecordProps> = ({
  attendanceRecords = [],
}) => {
  const [searchInput, setSearchInput] = useState(""); // Holds the input from the user
  const [searchTerm, setSearchTerm] = useState(""); // The term to actually search for

  // This function updates the actual search term which is used for filtering
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // Filtered records based on the actual search term
  const filteredRecords = attendanceRecords.filter((record) =>
    record.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Teacher Attendance Records</h2>
      {/* Search input and button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by teacher ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
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
