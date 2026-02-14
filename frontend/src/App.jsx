import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProjectDetails from './pages/ProjectDetails'
import Analytics from './pages/Analytics'
import AdminDashboard from './pages/AdminDashboard'
import FacultyDashboard from './pages/FacultyDashboard'
import FacultyStatus from './pages/FacultyStatus'
import FacultyActions from './pages/FacultyActions'
import CreateProjectPage from './pages/CreateProjectPage'
import EvaluationReports from './pages/EvaluationReports'
import StudentDashboard from './pages/StudentDashboard'
import TaskManagement from './pages/TaskManagement'
import PeerEvaluationPage from './pages/PeerEvaluationPage'
import StudentReport from './pages/StudentReport'
import FacultyProjects from './pages/FacultyProjects'
import FacultyTasks from './pages/FacultyTasks'
import FacultyStudents from './pages/FacultyStudents'
import FacultyEvaluations from './pages/FacultyEvaluations'
import FacultyReports from './pages/FacultyReports'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty" element={user?.role === 'faculty' ? <FacultyDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-status" element={user?.role === 'faculty' ? <FacultyStatus user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-actions" element={user?.role === 'faculty' ? <FacultyActions user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-projects" element={user?.role === 'faculty' ? <FacultyProjects user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-tasks" element={user?.role === 'faculty' ? <FacultyTasks user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-students" element={user?.role === 'faculty' ? <FacultyStudents user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-evaluations" element={user?.role === 'faculty' ? <FacultyEvaluations user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty-reports" element={user?.role === 'faculty' ? <FacultyReports user={user} /> : <Navigate to="/login" />} />
        <Route path="/create-project" element={user?.role === 'faculty' ? <CreateProjectPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? (user.role === 'student' ? <StudentDashboard user={user} /> : <Dashboard user={user} />) : <Navigate to="/login" />} />
        <Route path="/project/:id" element={user ? <ProjectDetails user={user} /> : <Navigate to="/login" />} />
        <Route path="/task/:id" element={user ? <TaskManagement user={user} /> : <Navigate to="/login" />} />
        <Route path="/peer-evaluation/:id" element={user?.role === 'student' ? <PeerEvaluationPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/student-report/:id" element={user?.role === 'student' ? <StudentReport user={user} /> : <Navigate to="/login" />} />
        <Route path="/analytics/:id" element={user ? <Analytics user={user} /> : <Navigate to="/login" />} />
        <Route path="/evaluation-report/:id" element={user?.role === 'faculty' ? <EvaluationReports user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
