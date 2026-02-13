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

  const COLORS = ['#007bff', '#28a745'];

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Faculty Dashboard - {user.name}</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#007bff', color: 'white' }}>
          <h2>{stats.totalProjects || 0}</h2>
          <p>Total Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#28a745', color: 'white' }}>
          <h2>{stats.activeProjects || 0}</h2>
          <p>Active Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#6c757d', color: 'white' }}>
          <h2>{stats.completedProjects || 0}</h2>
          <p>Completed Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#ffc107', color: 'white' }}>
          <h2>{stats.pendingEvaluations || 0}</h2>
          <p>Pending Evaluations</p>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3>Project Status Distribution</h3>
        <PieChart width={400} height={300} style={{ margin: '0 auto' }}>
          <Pie data={chartData} cx={200} cy={150} outerRadius={80} fill="#8884d8" dataKey="value" label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => navigate('/create-project')} className="btn btn-success">Create New Project</button>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">View All Projects</button>
      </div>

      <div className="card">
        <h2>My Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.subject || 'N/A'}</td>
                <td><span style={{ padding: '5px 10px', background: project.status === 'active' ? '#28a745' : '#6c757d', color: 'white', borderRadius: '4px' }}>{project.status}</span></td>
                <td>{new Date(project.deadline).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/project/${project._id}`)} className="btn btn-primary">View</button>
                  <button onClick={() => navigate(`/evaluation-report/${project._id}`)} className="btn btn-success">Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyDashboard;
