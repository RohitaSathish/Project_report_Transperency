import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFacultyStats, getProjects } from '../services/api';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function FacultyDashboard({ user }) {
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        getFacultyStats(),
        getProjects()
      ]);
      setStats(statsRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const chartData = [
    { name: 'Active', value: stats.activeProjects || 0 },
    { name: 'Completed', value: stats.completedProjects || 0 }
  ];

  const COLORS = ['#a8956b', '#8b7355'];

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Faculty Dashboard - {user.name}</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/create-project')} className="btn btn-success">Create Project</button>
          <button onClick={() => navigate('/faculty-projects')} className="btn btn-primary">Projects</button>
          <button onClick={() => navigate('/faculty-students')} className="btn btn-primary">Students & Tasks</button>
          <button onClick={() => navigate('/faculty-reports')} className="btn btn-primary">Reports</button>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#c9a882', color: 'white', border: 'none' }}>
          <h2>{stats.totalProjects || 0}</h2>
          <p>Total Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#a8956b', color: 'white', border: 'none' }}>
          <h2>{stats.activeProjects || 0}</h2>
          <p>Active Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#8b7355', color: 'white', border: 'none' }}>
          <h2>{stats.completedProjects || 0}</h2>
          <p>Completed Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#c4917a', color: 'white', border: 'none' }}>
          <h2>{stats.pendingEvaluations || 0}</h2>
          <p>Pending Evaluations</p>
        </div>
      </div>

      <div className="card">
        <h2>Recent Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Student</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web Development Project</td>
              <td>Rahul</td>
              <td>Submitted Task: Frontend Design</td>
              <td>Feb 13, 2026</td>
              <td><span style={{ padding: '5px 10px', background: '#a8956b', color: 'white', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
            </tr>
            <tr>
              <td>Mobile App Development</td>
              <td>Priya</td>
              <td>Updated Task: API Integration</td>
              <td>Feb 12, 2026</td>
              <td><span style={{ padding: '5px 10px', background: '#c9a882', color: 'white', borderRadius: '4px', fontSize: '12px' }}>In Progress</span></td>
            </tr>
            <tr>
              <td>Database Design Project</td>
              <td>Arjun</td>
              <td>Peer Evaluation Submitted</td>
              <td>Feb 11, 2026</td>
              <td><span style={{ padding: '5px 10px', background: '#a8956b', color: 'white', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
            </tr>
            <tr>
              <td>Web Development Project</td>
              <td>Ananya</td>
              <td>Started Task: Backend Development</td>
              <td>Feb 10, 2026</td>
              <td><span style={{ padding: '5px 10px', background: '#c9a882', color: 'white', borderRadius: '4px', fontSize: '12px' }}>In Progress</span></td>
            </tr>
            <tr>
              <td>Mobile App Development</td>
              <td>Vikram</td>
              <td>Submitted Task: UI/UX Design</td>
              <td>Feb 09, 2026</td>
              <td><span style={{ padding: '5px 10px', background: '#a8956b', color: 'white', borderRadius: '4px', fontSize: '12px' }}>Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Quick Stats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#f5e6d3', borderRadius: '8px', border: '1px solid #e8d5c4' }}>
            <h3 style={{ color: '#c9a882', marginBottom: '10px' }}>Active Students</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b5744' }}>24</p>
            <p style={{ color: '#6b5744', fontSize: '14px' }}>Across 5 projects</p>
          </div>
          <div style={{ padding: '20px', background: '#f5e6d3', borderRadius: '8px', border: '1px solid #e8d5c4' }}>
            <h3 style={{ color: '#a8956b', marginBottom: '10px' }}>Tasks This Week</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b5744' }}>18</p>
            <p style={{ color: '#6b5744', fontSize: '14px' }}>12 completed, 6 in progress</p>
          </div>
          <div style={{ padding: '20px', background: '#f5e6d3', borderRadius: '8px', border: '1px solid #e8d5c4' }}>
            <h3 style={{ color: '#8b7355', marginBottom: '10px' }}>Peer Evaluations</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b5744' }}>32</p>
            <p style={{ color: '#6b5744', fontSize: '14px' }}>Submitted this month</p>
          </div>
          <div style={{ padding: '20px', background: '#f5e6d3', borderRadius: '8px', border: '1px solid #e8d5c4' }}>
            <h3 style={{ color: '#c4917a', marginBottom: '10px' }}>Avg Completion Rate</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6b5744' }}>78%</p>
            <p style={{ color: '#6b5744', fontSize: '14px' }}>Across all projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
