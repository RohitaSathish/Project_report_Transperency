import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function FacultyReports({ user }) {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    setProjects(mockProjects);

    const activeProjects = mockProjects.filter(p => p.status === 'active').length;
    const completedProjects = mockProjects.filter(p => p.status === 'completed').length;

    setStats({ activeProjects, completedProjects, totalProjects: mockProjects.length });
  };

  const chartData = [
    { name: 'Active', value: stats.activeProjects || 0 },
    { name: 'Completed', value: stats.completedProjects || 0 }
  ];

  const COLORS = ['#a8956b', '#8b7355'];

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Reports & Analytics</h1>
        <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
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
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3>Project Status Distribution</h3>
        <PieChart width={400} height={350} style={{ margin: '0 auto' }}>
          <Pie data={chartData} cx={200} cy={175} outerRadius={100} fill="#8884d8" dataKey="value" label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="card">
        <h2>Project Reports</h2>
        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b5744' }}>No projects available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Subject</th>
                <th>Teams</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td><strong>{project.title}</strong></td>
                  <td>{project.subject || 'N/A'}</td>
                  <td>{project.teams.length} teams</td>
                  <td>
                    <span style={{
                      padding: '5px 12px',
                      background: project.status === 'active' ? '#a8956b' : '#8b7355',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      {project.status}
                    </span>
                  </td>
                  <td>{new Date(project.deadline).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => navigate(`/evaluation-report/${project.id}`)} className="btn btn-success">View Report</button>
                    <button onClick={() => navigate(`/analytics/${project.id}`)} className="btn btn-primary">Analytics</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyReports;
