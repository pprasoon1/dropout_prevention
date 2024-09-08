import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import ParentDashboard from './components/Parent/ParentDashboard';
import StudentDataForm from './components/Teacher/StudentDataForm';
import Home from './components/Home';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element = {<AdminDashboard />} />
        <Route path="/teacher" element = {<TeacherDashboard />} />
        <Route path="/student" element = {<StudentDashboard />} />
        <Route path="/parent" element ={<ParentDashboard />} />
        <Route path="/student-data" element={<StudentDataForm />} />
        
        </Routes>
  );
}

export default App;