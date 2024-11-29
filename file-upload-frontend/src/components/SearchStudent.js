import React, { useState } from 'react';
import { searchStudent,downloadFile  } from '../services/api';

function SearchStudent() {
  const [query, setQuery] = useState('');
  const [student, setStudent,setCurrentPage] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await searchStudent(query);
      setStudent(result);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("Student not found.");
    }
  };

  return (
    <div className="search-student">
      <h2>Search Student</h2>
      <input
        type="text"
        placeholder="Enter Name or Service Number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {student && (
        <div className="student-details">
          <p>Name: {student.name}</p>
          <p>Service Number: {student.serviceNumber}</p>
          <p>Department: {student.department}</p>
          <button onClick={() => downloadFile(student.endOfTermResultUrl)}>Download End of Term Result</button>
          <button onClick={() => downloadFile(student.servicePaperUrl)}>Download Service Paper</button>
        </div>
      )}
    </div>
  );
}

export default SearchStudent;
