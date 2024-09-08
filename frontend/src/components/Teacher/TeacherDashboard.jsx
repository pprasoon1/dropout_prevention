import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;