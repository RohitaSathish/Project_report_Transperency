import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStudents: 0, totalFaculty: 0, totalProjects: 0, activeProjects: 0 });
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, usersRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/users`, { headers })
      ]);
      setStats(statsRes.data);
      setFaculty(usersRes.data.filter(u => u.role === 'faculty').sort((a, b) => (a.employeeId || '').localeCompare(b.employeeId || '', undefined, { numeric: true })));
      setStudents(usersRes.data.filter(u => u.role === 'student').sort((a, b) => (a.rollNumber || '').localeCompare(b.rollNumber || '', undefined, { numeric: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const cardStyle = { textAlign: 'center', padding: '30px', borderRadius: '12px', background: '#faf8f5', border: '1px solid #e8d5c4', boxShadow: '0 4px 15px rgba(139,115,85,0.1)' };
  const thStyle = { background: '#f5e6d3', color: '#6b5744', padding: '12px', textAlign: 'left' };
  const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #f0e6d8', color: '#5a4a3a' };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#6b5744', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: '#8b7355', margin: 0 }}>Welcome, {user?.name || 'Admin'}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/admin/faculty')} className="btn btn-primary">+ Add Faculty</button>
          <button onClick={() => navigate('/admin/students')} className="btn btn-primary">+ Add Students</button>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={cardStyle}>
          <h2 style={{ color: '#c9a882', fontSize: '40px', margin: 0 }}>{stats.totalFaculty}</h2>
          <p style={{ color: '#8b7355', marginTop: '8px' }}>Total Faculty</p>
        </div>
        <div style={cardStyle}>
          <h2 style={{ color: '#c9a882', fontSize: '40px', margin: 0 }}>{stats.totalStudents}</h2>
          <p style={{ color: '#8b7355', marginTop: '8px' }}>Total Students</p>
        </div>
        <div style={cardStyle}>
          <h2 style={{ color: '#c9a882', fontSize: '40px', margin: 0 }}>{stats.totalProjects}</h2>
          <p style={{ color: '#8b7355', marginTop: '8px' }}>Total Projects</p>
        </div>
        <div style={cardStyle}>
          <h2 style={{ color: '#c9a882', fontSize: '40px', margin: 0 }}>{stats.activeProjects}</h2>
          <p style={{ color: '#8b7355', marginTop: '8px' }}>Active Projects</p>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="card" style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ color: '#6b5744', margin: 0 }}>Faculty Members ({faculty.length})</h2>
          <button onClick={() => navigate('/admin/faculty')} className="btn btn-primary" style={{ padding: '8px 16px' }}>Manage Faculty</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
            </tr>
          </thead>
          <tbody>
            {faculty.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#8b7355' }}>No faculty added yet</td></tr>
            ) : (
              faculty.map(f => (
                <tr key={f._id}>
                  <td style={tdStyle}>{f.employeeId || 'N/A'}</td>
                  <td style={tdStyle}>{f.name}</td>
                  <td style={tdStyle}>{f.email}</td>
                  <td style={tdStyle}>{f.department || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Students Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ color: '#6b5744', margin: 0 }}>Students ({students.length})</h2>
          <button onClick={() => navigate('/admin/students')} className="btn btn-primary" style={{ padding: '8px 16px' }}>Manage Students</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Roll Number</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#8b7355' }}>No students added yet</td></tr>
            ) : (
              students.map(s => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.rollNumber || 'N/A'}</td>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.department || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
