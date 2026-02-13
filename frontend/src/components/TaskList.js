import React, { useState } from 'react';
import { updateTask, submitTask } from '../services/api';

function TaskList({ tasks, user, onUpdate }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionNote, setSubmissionNote] = useState('');

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTask(taskId, { status });
      onUpdate();
    } catch (err) {
      alert('Error updating task');
    }
  };

  const handleSubmit = async (taskId) => {
    try {
      await submitTask(taskId, { note: submissionNote, timestamp: new Date() });
      setSelectedTask(null);
      setSubmissionNote('');
      onUpdate();
    } catch (err) {
      alert('Error submitting task');
    }
  };

  return (
    <div className="card">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Team</th>
              <th>Status</th>
              <th>Submissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.assignedTo.name}</td>
                <td>{task.team}</td>
                <td>
                  {user.role === 'student' && task.assignedTo._id === user.id ? (
                    <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span>{task.status}</span>
                  )}
                </td>
                <td>{task.submissionLog.length}</td>
                <td>
                  {user.role === 'student' && task.assignedTo._id === user.id && (
                    <button onClick={() => setSelectedTask(task._id)} className="btn btn-success">Submit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTask && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd' }}>
          <h3>Submit Task Progress</h3>
          <textarea
            placeholder="Add submission note..."
            value={submissionNote}
            onChange={(e) => setSubmissionNote(e.target.value)}
          />
          <button onClick={() => handleSubmit(selectedTask)} className="btn btn-success">Submit</button>
          <button onClick={() => setSelectedTask(null)} className="btn btn-danger">Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
