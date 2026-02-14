import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyStudents({ user }) {
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    const mockEvaluations = JSON.parse(localStorage.getItem('mockEvaluations') || '[]');
    
    const studentUsers = registeredUsers.filter(u => u.role === 'student');
    
    const studentsWithStats = studentUsers.map(student => {
      const studentTasks = mockTasks.filter(t => t.assignedTo === student.id);
      const completedTasks = studentTasks.filter(t => t.status === 'completed').length;
      const studentProjects = mockProjects.filter(p => 
        p.teams.some(t => t.members.includes(student.id))
      );
      
      return {
        ...student,
        totalTasks: studentTasks.length,
        completedTasks,
        projects: studentProjects.length,
        completionRate: studentTasks.length > 0 ? ((completedTasks / studentTasks.length) * 100).toFixed(0) : 0
      };
    });
    
    setStudents(studentsWithStats);
    setTasks(mockTasks);
    setProjects(mockProjects);
    setEvaluations(mockEvaluations);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  const getStudentName = (studentId) => {
    const student = students.find(u => u.id === studentId);
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
        <h1>Students & Task Management</h1>
        <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#c9a882' }}>{students.length}</h2>
          <p style={{ color: '#6b5744' }}>Total Students</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#a8956b' }}>{tasks.length}</h2>
          <p style={{ color: '#6b5744' }}>Total Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f5e6d3', border: '2px solid #e8d5c4' }}>
          <h2 style={{ color: '#c4917a' }}>{tasksByStatus.completed.length}</h2>
          <p style={{ color: '#6b5744' }}>Completed Tasks</p>
        </div>
      </div>

      <div className="card">
        <h2>Student Performance Overview</h2>
        {students.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b5744' }}>No students registered yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Projects</th>
                <th>Tasks</th>
                <th>Completed</th>
                <th>Completion Rate</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.projects}</td>
                  <td>{student.totalTasks}</td>
                  <td>{student.completedTasks}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', background: '#e8d5c4', borderRadius: '10px', height: '8px' }}>
                        <div style={{
                          width: `${student.completionRate}%`,
                          background: student.completionRate >= 70 ? '#a8956b' : student.completionRate >= 50 ? '#c9a882' : '#c4917a',
                          borderRadius: '10px',
                          height: '8px'
                        }}></div>
                      </div>
                      <span>{student.completionRate}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      padding: '5px 12px',
                      background: student.completionRate >= 70 ? '#a8956b' : student.completionRate >= 50 ? '#c9a882' : '#c4917a',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      {student.completionRate >= 70 ? 'Excellent' : student.completionRate >= 50 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Peer Evaluations</h2>
        {evaluations.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b5744' }}>No evaluations submitted yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Evaluator</th>
                <th>Teammate</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map(ev => (
                <tr key={ev.id}>
                  <td>{ev.evaluator}</td>
                  <td>{getStudentName(ev.teammate)}</td>
                  <td>{'★'.repeat(ev.rating)}{'☆'.repeat(5 - ev.rating)} ({ev.rating}/5)</td>
                  <td>{ev.feedback || 'No feedback'}</td>
                  <td>{new Date(ev.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyStudents;
