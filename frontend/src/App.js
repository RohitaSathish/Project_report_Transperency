import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Analytics from './pages/Analytics';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import CreateProjectPage from './pages/CreateProjectPage';
import EvaluationReports from './pages/EvaluationReports';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/faculty" element={user?.role === 'faculty' ? <FacultyDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/create-project" element={user?.role === 'faculty' ? <CreateProjectPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/project/:id" element={user ? <ProjectDetails user={user} /> : <Navigate to="/login" />} />
        <Route path="/analytics/:id" element={user ? <Analytics user={user} /> : <Navigate to="/login" />} />
        <Route path="/evaluation-report/:id" element={user?.role === 'faculty' ? <EvaluationReports user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user?.role === 'admin' ? '/admin' : user?.role === 'faculty' ? '/faculty' : '/dashboard'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
