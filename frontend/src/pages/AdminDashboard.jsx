import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats, getAllUsers, getAllProjects } from '../services/api';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes, projectsRes] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
        getAllProjects()
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>{stats.totalFaculty || 0}</h3>
          <p>Total Faculty</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>{stats.totalStudents || 0}</h3>
          <p>Total Students</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>{stats.totalProjects || 0}</h3>
          <p>Total Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>{stats.activeProjects || 0}</h3>
          <p>Active Projects</p>
        </div>
      </div>

      <div className="card">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>All Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Faculty</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.faculty?.name}</td>
                <td>{p.status}</td>
                <td>{new Date(p.deadline).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
