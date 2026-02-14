import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function StudentReport({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = () => {
    const mockTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
    const mockEvaluations = JSON.parse(localStorage.getItem('mockEvaluations') || '[]');
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');

    const project = mockProjects.find(p => p.id === id);
    const myTasks = mockTasks.filter(t => t.projectId === id && t.assignedTo === user.id);
    const evaluationsAboutMe = mockEvaluations.filter(e => e.projectId === id && e.teammate === user.id);

    const completedTasks = myTasks.filter(t => t.status === 'completed').length;
    const totalTasks = myTasks.length;
    const completionPercent = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    const avgRating = evaluationsAboutMe.length > 0
      ? (evaluationsAboutMe.reduce((sum, e) => sum + e.rating, 0) / evaluationsAboutMe.length).toFixed(2)
      : 0;

    const finalGrade = project?.gradesPublished 
      ? ((parseFloat(completionPercent) * 0.6) + (parseFloat(avgRating) * 20 * 0.4)).toFixed(1)
      : null;

    setReport({
      project,
      myTasks,
      evaluationsAboutMe,
      completedTasks,
      totalTasks,
      completionPercent,
      avgRating,
      finalGrade
    });
  };

  if (!report) return <div className="container">Loading...</div>;

  const taskData = [
    { name: 'Completed', value: report.completedTasks },
    { name: 'Pending', value: report.totalTasks - report.completedTasks }
  ];

  const COLORS = ['#28a745', '#dc3545'];

  const performanceData = [
    { name: 'Task Completion', value: parseFloat(report.completionPercent) },
    { name: 'Peer Rating', value: parseFloat(report.avgRating) * 20 }
  ];

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Back to Dashboard</button>

      <div className="card">
        <h1>My Contribution Report</h1>
        <h3>{report.project?.title}</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', background: '#007bff', color: 'white' }}>
          <h2>{report.completionPercent}%</h2>
          <p>Task Completion</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#ffc107', color: 'white' }}>
          <h2>{report.avgRating}/5</h2>
          <p>Peer Rating</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#28a745', color: 'white' }}>
          <h2>{report.completedTasks}/{report.totalTasks}</h2>
          <p>Tasks Done</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: report.finalGrade ? '#17a2b8' : '#6c757d', color: 'white' }}>
          <h2>{report.finalGrade || 'N/A'}</h2>
          <p>Final Grade</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Task Status Distribution</h3>
          <PieChart width={300} height={300} style={{ margin: '0 auto' }}>
            <Pie data={taskData} cx={150} cy={150} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Performance Analytics</h3>
          <BarChart width={300} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </div>
      </div>

      <div className="card">
        <h2>My Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {report.myTasks.length === 0 ? (
              <tr><td colSpan="3">No tasks assigned</td></tr>
            ) : (
              report.myTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <span style={{
                      padding: '5px 10px',
                      background: task.status === 'completed' ? '#28a745' : task.status === 'in-progress' ? '#ffc107' : '#6c757d',
                      color: 'white',
                      borderRadius: '4px'
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Peer Feedback Received</h2>
        {report.evaluationsAboutMe.length === 0 ? (
          <p>No peer evaluations received yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {report.evaluationsAboutMe.map(ev => (
                <tr key={ev.id}>
                  <td>{ev.evaluator}</td>
                  <td>{'★'.repeat(ev.rating)}{'☆'.repeat(5 - ev.rating)}</td>
                  <td>{ev.feedback || 'No feedback'}</td>
                  <td>{new Date(ev.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!report.finalGrade && (
        <div className="card" style={{ background: '#fff3cd', border: '1px solid #ffc107' }}>
          <p><strong>Note:</strong> Final grades have not been published yet by the faculty.</p>
        </div>
      )}
    </div>
  );
}

export default StudentReport;
