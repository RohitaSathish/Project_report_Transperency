import React from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyActions({ user }) {
  const navigate = useNavigate();

  const actions = [
    { title: 'Create New Project', icon: '📝', path: '/create-project', color: '#a8956b', description: 'Start a new group project' },
    { title: 'View All Projects', icon: '📂', path: '/faculty-projects', color: '#c9a882', description: 'See all your projects' },
    { title: 'Manage Tasks', icon: '✓', path: '/faculty-tasks', color: '#8b7355', description: 'Track and manage tasks' },
    { title: 'View Students', icon: '👥', path: '/faculty-students', color: '#c4917a', description: 'Student performance overview' },
    { title: 'View Evaluations', icon: '⭐', path: '/faculty-evaluations', color: '#a8956b', description: 'Peer evaluation results' },
    { title: 'Generate Reports', icon: '📊', path: '/faculty-reports', color: '#c9a882', description: 'Create performance reports' }
  ];

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Quick Actions</h1>
        <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
      </div>

      <div className="card">
        <h2>Available Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
          {actions.map((action, idx) => (
            <div
              key={idx}
              onClick={() => navigate(action.path)}
              style={{
                padding: '30px',
                background: action.color,
                color: 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{action.icon}</div>
              <h3 style={{ marginBottom: '10px', color: 'white' }}>{action.title}</h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Quick Links</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          <button onClick={() => navigate('/faculty-status')} className="btn btn-primary" style={{ padding: '15px' }}>
            📊 Project Status Distribution
          </button>
          <button onClick={() => navigate('/faculty-projects')} className="btn btn-primary" style={{ padding: '15px' }}>
            📂 My Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default FacultyActions;
