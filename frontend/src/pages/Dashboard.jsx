import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject } from '../services/api';
import CreateProject from '../components/CreateProject';

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard - {user.name} ({user.role})</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      {user.role === 'faculty' && (
        <button onClick={() => setShowCreate(!showCreate)} className="btn btn-primary">
          {showCreate ? 'Cancel' : 'Create New Project'}
        </button>
      )}

      {showCreate && <CreateProject onSuccess={() => { setShowCreate(false); loadProjects(); }} />}

      <div className="card">
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{new Date(project.deadline).toLocaleDateString()}</td>
                  <td>{project.status}</td>
                  <td>
                    <button onClick={() => navigate(`/project/${project._id}`)} className="btn btn-primary">
                      View
                    </button>
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

export default Dashboard;
