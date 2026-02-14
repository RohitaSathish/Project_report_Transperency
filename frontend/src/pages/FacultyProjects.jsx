import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyProjects({ user }) {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    setProjects(mockProjects);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>My Projects</h1>
        <div>
          <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
          <button onClick={() => navigate('/create-project')} className="btn btn-success">Create New Project</button>
        </div>
      </div>

      <div className="card">
        <h2>All Projects</h2>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6b5744', marginBottom: '20px' }}>No projects created yet</p>
            <button onClick={() => navigate('/create-project')} className="btn btn-success">Create Your First Project</button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Project Title</th>
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
                    <button onClick={() => navigate(`/project/${project.id}`)} className="btn btn-primary">View</button>
                    <button onClick={() => navigate(`/evaluation-report/${project.id}`)} className="btn btn-success">Reports</button>
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

export default FacultyProjects;
