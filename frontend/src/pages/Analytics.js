import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalytics } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, [id]);

  const loadAnalytics = async () => {
    try {
      const { data } = await getAnalytics(id);
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(`/project/${id}`)} className="btn btn-primary">Back to Project</button>
      
      <div className="card">
        <h1>Performance Analytics</h1>
        
        {analytics.length > 0 && (
          <>
            <BarChart width={800} height={400} data={analytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#28a745" name="Tasks Completed" />
              <Bar dataKey="avgPeerScore" fill="#007bff" name="Avg Peer Score" />
            </BarChart>

            <table style={{ marginTop: '30px' }}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Tasks Completed</th>
                  <th>Total Tasks</th>
                  <th>Submissions</th>
                  <th>Avg Peer Score</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((student, idx) => (
                  <tr key={idx}>
                    <td>{student.name}</td>
                    <td>{student.tasksCompleted}</td>
                    <td>{student.tasksTotal}</td>
                    <td>{student.submissions}</td>
                    <td>{student.avgPeerScore.toFixed(2)}</td>
                    <td>{((student.tasksCompleted / student.tasksTotal) * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Analytics;
