import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalytics, getProject, updateProject, updateMarks } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function EvaluationReports({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [editingMarks, setEditingMarks] = useState({});

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [analyticsRes, projectRes] = await Promise.all([
        getAnalytics(id),
        getProject(id)
      ]);
      setAnalytics(analyticsRes.data);
      setProject(projectRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkEdit = (studentId, value) => {
    setEditingMarks({ ...editingMarks, [studentId]: value });
  };

  const saveMarks = async (studentId) => {
    try {
      await updateMarks(id, { studentId, adjustedMarks: editingMarks[studentId] });
      alert('Marks updated successfully');
      setEditingMarks({ ...editingMarks, [studentId]: null });
    } catch (err) {
      alert('Error updating marks');
    }
  };

  const closeProject = async () => {
    if (window.confirm('Are you sure you want to close this project?')) {
      try {
        await updateProject(id, { status: 'completed' });
        alert('Project closed successfully');
        navigate('/faculty');
      } catch (err) {
        alert('Error closing project');
      }
    }
  };

  const downloadReport = () => {
    const reportContent = analytics.map(s => 
      `${s.name}: Contribution ${s.contributionPercent.toFixed(1)}%, Peer Score ${s.avgPeerScore.toFixed(2)}, Final Score ${s.finalScore}`
    ).join('\n');
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project?.title}_report.txt`;
    a.click();
  };

  return (
    <div className="container">
      <button onClick={() => navigate(`/project/${id}`)} className="btn btn-primary">Back to Project</button>
      
      {project && (
        <div className="card">
          <h1>Evaluation & Reports - {project.title}</h1>
          <p><strong>Subject:</strong> {project.subject}</p>
          <p><strong>Status:</strong> {project.status}</p>
        </div>
      )}

      <div className="card">
        <h2>Contribution Analysis</h2>
        {analytics.length > 0 && (
          <BarChart width={900} height={400} data={analytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="contributionPercent" fill="#007bff" name="Contribution %" />
            <Bar dataKey="completionRate" fill="#28a745" name="Completion Rate %" />
            <Bar dataKey="avgPeerScore" fill="#ffc107" name="Peer Score" />
          </BarChart>
        )}
      </div>

      <div className="card">
        <h2>Individual Performance Report</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Contribution %</th>
              <th>Peer Rating Avg</th>
              <th>Task Completion</th>
              <th>Submissions</th>
              <th>Final Score</th>
              <th>Adjust Marks</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.contributionPercent.toFixed(1)}%</td>
                <td>{student.avgPeerScore.toFixed(2)}/10</td>
                <td>{student.tasksCompleted}/{student.tasksTotal} ({student.completionRate.toFixed(0)}%)</td>
                <td>{student.submissions}</td>
                <td><strong>{student.finalScore}</strong></td>
                <td>
                  {editingMarks[student.id] !== undefined ? (
                    <>
                      <input
                        type="number"
                        value={editingMarks[student.id]}
                        onChange={(e) => handleMarkEdit(student.id, e.target.value)}
                        style={{ width: '60px' }}
                      />
                      <button onClick={() => saveMarks(student.id)} className="btn btn-success">Save</button>
                      <button onClick={() => setEditingMarks({ ...editingMarks, [student.id]: null })} className="btn btn-danger">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleMarkEdit(student.id, student.finalScore)} className="btn btn-primary">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={downloadReport} className="btn btn-success">Download PDF Report</button>
        <button onClick={closeProject} className="btn btn-danger">Close Project</button>
      </div>
    </div>
  );
}

export default EvaluationReports;
