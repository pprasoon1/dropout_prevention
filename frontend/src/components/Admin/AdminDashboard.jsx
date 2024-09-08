import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataVisualization from '../DataVisualization';

function AdminDashboard() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/student-data/');
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <DataVisualization data={studentData} />
    </div>
  );
}

export default AdminDashboard;