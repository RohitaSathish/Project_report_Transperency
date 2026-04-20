import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    
    const userProjects = mockProjects.filter(p => 
      p.teams.some(t => t.members.includes(user.id))
    );
    
    const userTasks = mockTasks.filter(t => t.assignedTo === user.id);
    
    setProjects(userProjects);
    setTasks(userTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const contributionPercent = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;
  const upcomingDeadlines = projects.filter(p => new Date(p.deadline) > new Date()).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(250, 248, 245, 0.95)', boxShadow: '0 2px 10px rgba(139, 115, 85, 0.1)', padding: '20px 0', marginBottom: '30px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#6b5744', margin: 0, fontSize: '28px', fontWeight: '600' }}>Student Dashboard</h1>
            <p style={{ color: '#8b7355', margin: '5px 0 0 0', fontSize: '14px' }}>Welcome back, {user.name}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">My Projects</button>
            <button onClick={() => {
              if (projects.length > 0) {
                navigate(`/peer-evaluation/${projects[0].id}`);
              } else {
                alert('No projects available for evaluation');
              }
            }} className="btn btn-success">Evaluate Peers</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            background: '#faf8f5', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#c9a882', marginBottom: '8px' }}>{projects.length}</div>
            <p style={{ color: '#8b7355', fontSize: '14px', margin: 0 }}>Assigned Projects</p>
          </div>
          <div style={{ 
            background: '#faf8f5', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#a8956b', marginBottom: '8px' }}>{completedTasks}/{totalTasks}</div>
            <p style={{ color: '#8b7355', fontSize: '14px', margin: 0 }}>Tasks Completed</p>
          </div>
          <div style={{ 
            background: '#faf8f5', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#c4917a', marginBottom: '8px' }}>{upcomingDeadlines.length}</div>
            <p style={{ color: '#8b7355', fontSize: '14px', margin: 0 }}>Upcoming Deadlines</p>
          </div>
          <div style={{ 
            background: '#faf8f5', 
            padding: '25px', 
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#8b7355', marginBottom: '8px' }}>{contributionPercent}%</div>
            <p style={{ color: '#8b7355', fontSize: '14px', margin: 0 }}>Contribution</p>
          </div>
        </div>

        {/* Welcome Message for Empty State */}
        {projects.length === 0 && tasks.length === 0 && (
          <div style={{ 
            background: '#faf8f5', 
            borderRadius: '12px', 
            padding: '60px 30px',
            marginBottom: '30px',
            boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#6b5744', marginBottom: '15px', fontSize: '24px' }}>Welcome to Your Dashboard!</h2>
            <p style={{ color: '#8b7355', fontSize: '16px', marginBottom: '20px' }}>You don't have any projects or tasks assigned yet.</p>
            <p style={{ color: '#8b7355', fontSize: '14px' }}>Once your faculty assigns projects, they will appear here.</p>
          </div>
        )}

        {/* Task Status Overview */}
        <div style={{ 
          background: '#faf8f5', 
          borderRadius: '12px', 
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
          border: '1px solid #e8d5c4'
        }}>
          <h2 style={{ color: '#6b5744', marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>Task Status Overview</h2>
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#8b7355' }}>No tasks assigned yet</p>
          ) : (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px', textAlign: 'left', borderBottom: '2px solid #e8d5c4', color: '#6b5744', fontWeight: '600' }}>Task</th>
                  <th style={{ padding: '14px', textAlign: 'left', borderBottom: '2px solid #e8d5c4', color: '#6b5744', fontWeight: '600' }}>Project</th>
                  <th style={{ padding: '14px', textAlign: 'left', borderBottom: '2px solid #e8d5c4', color: '#6b5744', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '14px', textAlign: 'left', borderBottom: '2px solid #e8d5c4', color: '#6b5744', fontWeight: '600' }}>Deadline</th>
                  <th style={{ padding: '14px', textAlign: 'left', borderBottom: '2px solid #e8d5c4', color: '#6b5744', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} style={{ borderBottom: '1px solid #e8d5c4' }}>
                    <td style={{ padding: '14px', color: '#6b5744' }}>{task.title}</td>
                    <td style={{ padding: '14px', color: '#8b7355' }}>{projects.find(p => p.id === task.projectId)?.title || 'N/A'}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        background: task.status === 'completed' ? '#a8956b' : task.status === 'in-progress' ? '#c9a882' : '#c4917a',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px', color: '#8b7355' }}>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                    <td style={{ padding: '14px' }}>
                      <button onClick={() => navigate(`/task/${task.id}`)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Projects Grid */}
        <div style={{ 
          background: '#faf8f5', 
          borderRadius: '12px', 
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
          border: '1px solid #e8d5c4'
        }}>
          <h2 style={{ color: '#6b5744', marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>My Projects</h2>
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#8b7355' }}>No projects assigned yet</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {projects.map(project => (
                <div key={project.id} style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '10px',
                  border: '1px solid #e8d5c4',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 115, 85, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <h3 style={{ color: '#6b5744', marginBottom: '10px', fontSize: '18px', fontWeight: '600' }}>{project.title}</h3>
                  <p style={{ color: '#8b7355', fontSize: '14px', marginBottom: '15px' }}>{project.subject || 'N/A'}</p>
                  <p style={{ color: '#8b7355', fontSize: '13px', marginBottom: '15px' }}>Due: {new Date(project.deadline).toLocaleDateString()}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate(`/project/${project.id}`)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>View</button>
                    <button onClick={() => navigate(`/peer-evaluation/${project.id}`)} className="btn btn-success" style={{ padding: '8px 16px', fontSize: '13px' }}>Evaluate</button>
                    <button onClick={() => navigate(`/student-report/${project.id}`)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Report</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div style={{ 
          background: '#faf8f5', 
          borderRadius: '12px', 
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(139, 115, 85, 0.1)',
          border: '1px solid #e8d5c4'
        }}>
          <h2 style={{ color: '#6b5744', marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>Upcoming Deadlines</h2>
          {upcomingDeadlines.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#8b7355' }}>No upcoming deadlines</p>
          ) : (
            upcomingDeadlines.map(project => (
              <div key={project.id} style={{ 
                padding: '15px', 
                borderBottom: '1px solid #e8d5c4',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ color: '#6b5744', fontSize: '15px' }}>{project.title}</strong>
                  <p style={{ color: '#8b7355', fontSize: '13px', margin: '5px 0 0 0' }}>Due: {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
                <button onClick={() => navigate(`/project/${project.id}`)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>View</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
