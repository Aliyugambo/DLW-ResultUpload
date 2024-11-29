// src/components/PreviewStudent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreviewStudent = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/student/${studentId}`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching student data');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Preview Files for {student.studentName}</h2>

      <div>
        <h3>Department:</h3>
        <p>{student.department}</p>
      </div>

      <div>
        <h3>End-of-Term Result:</h3>
        {/* Embed PDF or provide a link */}
        <a href={student.endOfTermResult} target="_blank" rel="noopener noreferrer">
          View End-of-Term Result
        </a>
        <iframe
          src={student.endOfTermResult}
          width="100%"
          height="500px"
          title="End of Term Result"
        ></iframe>
      </div>

      <div>
        <h3>Service Paper:</h3>
        {/* Embed PDF or provide a link */}
        <a href={student.servicePaper} target="_blank" rel="noopener noreferrer">
          View Service Paper
        </a>
        <iframe
          src={student.servicePaper}
          width="100%"
          height="500px"
          title="Service Paper"
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewStudent;
