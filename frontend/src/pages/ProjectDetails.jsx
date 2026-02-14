import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, getTasks, createTask, updateTask, submitTask } from '../services/api';
import TaskList from '../components/TaskList';
import PeerEvaluation from '../components/PeerEvaluation';

function ProjectDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([getProject(id), getTasks(id)]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(user.role === 'faculty' ? '/faculty' : '/dashboard')} className="btn btn-primary">Back to Dashboard</button>
      
      {project && (
        <>
          <div className="card">
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p><strong>Subject:</strong> {project.subject || 'N/A'}</p>
            <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {project.status}</p>
            {tasks.length > 0 && (
              <p><strong>Progress:</strong> {((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100).toFixed(0)}%</p>
            )}
          </div>

          <div className="card">
            <h2>Teams & Members</h2>
            {project.teams.map((team, idx) => (
              <div key={idx} style={{ marginBottom: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                <h3>{team.name}</h3>
                <p>Members: {team.members.map(m => m.name).join(', ')}</p>
              </div>
            ))}
          </div>

          {project.activityLogs && project.activityLogs.length > 0 && (
            <div className="card">
              <h2>Activity Logs</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>User</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {project.activityLogs.slice(-10).reverse().map((log, idx) => (
                    <tr key={idx}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>{log.user}</td>
                      <td>{log.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {user.role === 'faculty' && (
            <>
              <button onClick={() => setShowTaskForm(!showTaskForm)} className="btn btn-success">
                {showTaskForm ? 'Cancel' : 'Create Task'}
              </button>
              <button onClick={() => navigate(`/evaluation-report/${id}`)} className="btn btn-primary">
                View Contribution Report
              </button>
              <button onClick={() => navigate(`/analytics/${id}`)} className="btn btn-primary">
                View Analytics
              </button>
            </>
          )}

          {user.role === 'student' && (
            <>
              <button onClick={() => navigate(`/peer-evaluation/${id}`)} className="btn btn-success">
                Peer Evaluation
              </button>
              <button onClick={() => navigate(`/student-report/${id}`)} className="btn btn-primary">
                My Contribution Report
              </button>
            </>
          )}

          {showTaskForm && (
            <TaskForm project={project} onSuccess={() => { setShowTaskForm(false); loadData(); }} />
          )}

          {showEvaluation && (
            <PeerEvaluation project={project} user={user} onSuccess={() => setShowEvaluation(false)} />
          )}

          <TaskList tasks={tasks} user={user} onUpdate={loadData} />
        </>
      )}
    </div>
  );
}

function TaskForm({ project, onSuccess }) {
  const [formData, setFormData] = useState({
    project: project._id,
    team: '',
    title: '',
    description: '',
    assignedTo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      onSuccess();
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <div className="card">
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit}>
        <select value={formData.team} onChange={(e) => setFormData({ ...formData, team: e.target.value })} required>
          <option value="">Select Team</option>
          {project.teams.map((team, idx) => (
            <option key={idx} value={team.name}>{team.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} required>
          <option value="">Assign To</option>
          {project.teams.find(t => t.name === formData.team)?.members.map(member => (
            <option key={member._id} value={member._id}>{member.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
}

export default ProjectDetails;
