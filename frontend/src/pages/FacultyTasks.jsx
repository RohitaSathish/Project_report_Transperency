import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyTasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    setTasks(mockTasks);
    setProjects(mockProjects);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  const getStudentName = (studentId) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const student = users.find(u => u.id === studentId);
    return student?.name || 'Unknown Student';
  };

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    completed: tasks.filter(t => t.status === 'completed')
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Task Management</h1>
        <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#c4917a' }}>{tasksByStatus.pending.length}</h2>
          <p style={{ color: '#6b5744' }}>Pending Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#c9a882' }}>{tasksByStatus['in-progress'].length}</h2>
          <p style={{ color: '#6b5744' }}>In Progress</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#a8956b' }}>{tasksByStatus.completed.length}</h2>
          <p style={{ color: '#6b5744' }}>Completed</p>
        </div>
      </div>

      <div className="card">
        <h2>All Tasks Overview</h2>
        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b5744' }}>No tasks created yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td><strong>{task.title}</strong></td>
                  <td>{getProjectName(task.projectId)}</td>
                  <td>{getStudentName(task.assignedTo)}</td>
                  <td>
                    <span style={{
                      padding: '5px 12px',
                      background: task.status === 'completed' ? '#a8956b' : task.status === 'in-progress' ? '#c9a882' : '#c4917a',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div style={{ width: '100px', background: '#e8d5c4', borderRadius: '10px', height: '8px' }}>
                      <div style={{
                        width: task.status === 'completed' ? '100%' : task.status === 'in-progress' ? '50%' : '10%',
                        background: '#a8956b',
                        borderRadius: '10px',
                        height: '8px'
                      }}></div>
                    </div>
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

export default FacultyTasks;
