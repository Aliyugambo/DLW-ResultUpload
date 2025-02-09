import React, { useEffect, useState } from 'react';
import { fetchStudentCountByCourse } from '../services/api';
import './DashboardLayout.css'

function DashboardHome() {
  const [courseCounts, setCourseCounts] = useState([]);

  useEffect(() => {
    const loadCourseCounts = async () => {
      try {
        const data = await fetchStudentCountByCourse();
        setCourseCounts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCourseCounts();
  }, []);

  return (
    <div className="dashboard-home">
      <h1>Total Number of Student</h1>
      <div className="counts-container">
        {courseCounts.map((course) => (
          <div key={course.name} className="course-count">
            <div className="count-circle">
              <h2>{course.count}</h2>
            </div>
            <p>{course._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
