import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyEvaluations({ user }) {
  const [evaluations, setEvaluations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = () => {
    const mockEvaluations = JSON.parse(localStorage.getItem('mockEvaluations') || '[]');
    setEvaluations(mockEvaluations);
  };

  const getStudentName = (studentId) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const student = users.find(u => u.id === studentId);
    return student?.name || 'Unknown';
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Peer Evaluations</h1>
        <button onClick={() => navigate('/faculty')} className="btn btn-primary">Dashboard</button>
      </div>

      <div className="card">
        <h2>All Peer Evaluations</h2>
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

export default FacultyEvaluations;
