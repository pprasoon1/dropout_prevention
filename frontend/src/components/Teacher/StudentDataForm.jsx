import React, { useState } from 'react';
import axios from 'axios';

function StudentDataForm() {
  const [formData, setFormData] = useState({
    student: '', 
    attendance: '',
    grades: '',
    behavior_score: '',
    extracurricular_activities: '',
    parent_involvement: '',
    socioeconomic_status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure you are sending correct data types for each field
    const dataToSubmit = {
      student: parseInt(formData.student, 10),  // Send student field as integer
      attendance: parseFloat(formData.attendance),
      grades: parseFloat(formData.grades),
      behavior_score: parseInt(formData.behavior_score, 10),
      extracurricular_activities: parseInt(formData.extracurricular_activities, 10),
      parent_involvement: parseInt(formData.parent_involvement, 10),
      socioeconomic_status: formData.socioeconomic_status,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/process-student-data/', dataToSubmit);
      alert('Student data submitted successfully!');
      setFormData({
        student: '',
        attendance: '',
        grades: '',
        behavior_score: '',
        extracurricular_activities: '',
        parent_involvement: '',
        socioeconomic_status: '',
      });
    } catch (error) {
      console.error('Error submitting student data:', error.response.data);
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="student"  // Updated name to student
        value={formData.student}
        onChange={handleChange}
        placeholder="Student ID (numeric)"
       /* required */
      />
      <input
        type="number"
        name="attendance"
        value={formData.attendance}
        onChange={handleChange}
        placeholder="Attendance (%)"
        required
      />
      <input
        type="number"
        name="grades"
        value={formData.grades}
        onChange={handleChange}
        placeholder="Grades"
        required
      />
      <input
        type="number"
        name="behavior_score"
        value={formData.behavior_score}
        onChange={handleChange}
        placeholder="Behavior Score (1-10)"
        required
      />
      <input
        type="number"
        name="extracurricular_activities"
        value={formData.extracurricular_activities}
        onChange={handleChange}
        placeholder="Extracurricular Activities"
        required
      />
      <input
        type="number"
        name="parent_involvement"
        value={formData.parent_involvement}
        onChange={handleChange}
        placeholder="Parent Involvement (1-5)"
        required
      />
      <select
        name="socioeconomic_status"
        value={formData.socioeconomic_status}
        onChange={handleChange}
        required
      >
        <option value="">Select Socioeconomic Status</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentDataForm;
