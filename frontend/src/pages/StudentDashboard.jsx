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
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Student Dashboard - {user.name}</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#c9a882', color: 'white', border: 'none' }}>
          <h2>{projects.length}</h2>
          <p>Assigned Projects</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#a8956b', color: 'white', border: 'none' }}>
          <h2>{completedTasks}/{totalTasks}</h2>
          <p>Tasks Completed</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#c4917a', color: 'white', border: 'none' }}>
          <h2>{upcomingDeadlines.length}</h2>
          <p>Upcoming Deadlines</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#8b7355', color: 'white', border: 'none' }}>
          <h2>{contributionPercent}%</h2>
          <p>Contribution</p>
        </div>
      </div>

      <div className="card">
        <h2>Task Status Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr><td colSpan="5">No tasks assigned yet</td></tr>
            ) : (
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{projects.find(p => p.id === task.projectId)?.title || 'N/A'}</td>
                  <td>
                    <span style={{ 
                      padding: '5px 10px', 
                      background: task.status === 'completed' ? '#a8956b' : task.status === 'in-progress' ? '#c9a882' : '#c4917a',
                      color: 'white',
                      borderRadius: '4px'
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => navigate(`/task/${task.id}`)} className="btn btn-primary">Update</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Assigned Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr><td colSpan="4">No projects assigned yet</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.subject || 'N/A'}</td>
                  <td>{new Date(project.deadline).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => navigate(`/project/${project.id}`)} className="btn btn-primary">View</button>
                    <button onClick={() => navigate(`/peer-evaluation/${project.id}`)} className="btn btn-success">Evaluate Peers</button>
                    <button onClick={() => navigate(`/student-report/${project.id}`)} className="btn btn-primary">My Report</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Upcoming Deadlines</h2>
        {upcomingDeadlines.length === 0 ? (
          <p>No upcoming deadlines</p>
        ) : (
          upcomingDeadlines.map(project => (
            <div key={project.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <strong>{project.title}</strong> - Due: {new Date(project.deadline).toLocaleDateString()}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
