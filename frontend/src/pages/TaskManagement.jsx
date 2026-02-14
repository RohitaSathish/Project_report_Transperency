import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskManagement({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = () => {
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    const foundTask = mockTasks.find(t => t.id === id);
    setTask(foundTask);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    const updatedTasks = mockTasks.map(t => 
      t.id === id ? { ...t, ...task } : t
    );
    localStorage.setItem('mockTasks', JSON.stringify(updatedTasks));
    alert('Task updated successfully!');
    navigate('/dashboard');
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      user: user.name,
      text: comment,
      timestamp: new Date().toISOString()
    };
    setTask({ ...task, comments: [...(task.comments || []), newComment] });
    setComment('');
  };

  const handleFileUpload = () => {
    if (!file) return;
    const newFile = {
      id: Date.now().toString(),
      name: file,
      uploadedBy: user.name,
      timestamp: new Date().toISOString()
    };
    setTask({ ...task, files: [...(task.files || []), newFile] });
    setFile(null);
  };

  if (!task) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Back to Dashboard</button>

      <div className="card">
        <h1>Task Management</h1>
        <form onSubmit={handleUpdate}>
          <label>Task Title *</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            value={task.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <label>Assigned To</label>
          <input type="text" value={user.name} disabled />

          <label>Deadline</label>
          <input
            type="date"
            value={task.deadline || ''}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          />

          <label>Status *</label>
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button type="submit" className="btn btn-success">Update Task</button>
        </form>
      </div>

      <div className="card">
        <h2>Upload Files</h2>
        <input
          type="text"
          placeholder="File name or URL"
          value={file || ''}
          onChange={(e) => setFile(e.target.value)}
        />
        <button onClick={handleFileUpload} className="btn btn-success">Upload</button>

        <h3 style={{ marginTop: '20px' }}>Uploaded Files</h3>
        {(task.files || []).length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          <ul>
            {task.files.map(f => (
              <li key={f.id}>
                {f.name} - Uploaded by {f.uploadedBy} on {new Date(f.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2>Comments</h2>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleAddComment} className="btn btn-primary">Add Comment</button>
        </div>

        <div>
          {(task.comments || []).length === 0 ? (
            <p>No comments yet</p>
          ) : (
            task.comments.map(c => (
              <div key={c.id} style={{ padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '4px' }}>
                <strong>{c.user}</strong> - {new Date(c.timestamp).toLocaleString()}
                <p>{c.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagement;
