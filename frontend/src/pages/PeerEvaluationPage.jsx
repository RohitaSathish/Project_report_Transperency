import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PeerEvaluationPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [teammates, setTeammates] = useState([]);
  const [formData, setFormData] = useState({
    teammate: '',
    rating: 3,
    feedback: '',
    anonymous: false
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = () => {
    const mockProjects = JSON.parse(localStorage.getItem('mockProjects') || '[]');
    const foundProject = mockProjects.find(p => p.id === id);
    setProject(foundProject);

    if (foundProject) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const team = foundProject.teams.find(t => t.members.includes(user.id));
      if (team) {
        const teamMembers = team.members
          .filter(memberId => memberId !== user.id)
          .map(memberId => registeredUsers.find(u => u.id === memberId))
          .filter(Boolean);
        setTeammates(teamMembers);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const evaluation = {
      id: Date.now().toString(),
      projectId: id,
      evaluator: formData.anonymous ? 'Anonymous' : user.name,
      evaluatorId: user.id,
      teammate: formData.teammate,
      rating: formData.rating,
      feedback: formData.feedback,
      timestamp: new Date().toISOString()
    };

    const evaluations = JSON.parse(localStorage.getItem('mockEvaluations') || '[]');
    evaluations.push(evaluation);
    localStorage.setItem('mockEvaluations', JSON.stringify(evaluations));

    alert('Peer evaluation submitted successfully!');
    setFormData({ teammate: '', rating: 3, feedback: '', anonymous: false });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        onClick={() => setFormData({ ...formData, rating: star })}
        style={{
          fontSize: '30px',
          cursor: 'pointer',
          color: star <= formData.rating ? '#ffc107' : '#ddd'
        }}
      >
        ★
      </span>
    ));
  };

  if (!project) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Back to Dashboard</button>

      <div className="card">
        <h1>Peer Evaluation - {project.title}</h1>
        <p>Evaluate your teammates' contributions</p>

        <form onSubmit={handleSubmit}>
          <label>Select Teammate *</label>
          <select
            value={formData.teammate}
            onChange={(e) => setFormData({ ...formData, teammate: e.target.value })}
            required
          >
            <option value="">Choose a teammate</option>
            {teammates.map(mate => (
              <option key={mate.id} value={mate.id}>{mate.name}</option>
            ))}
          </select>

          <label>Rating (1-5 stars) *</label>
          <div style={{ marginBottom: '15px' }}>
            {renderStars()}
            <span style={{ marginLeft: '10px', fontSize: '18px' }}>{formData.rating}/5</span>
          </div>

          <label>Feedback Comment</label>
          <textarea
            placeholder="Provide constructive feedback..."
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            rows="5"
          />

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                style={{ marginRight: '10px', width: 'auto' }}
              />
              Submit as Anonymous
            </label>
          </div>

          <button type="submit" className="btn btn-success">Submit Evaluation</button>
        </form>
      </div>

      <div className="card">
        <h2>My Submitted Evaluations</h2>
        {(() => {
          const evaluations = JSON.parse(localStorage.getItem('mockEvaluations') || '[]');
          const myEvaluations = evaluations.filter(e => e.evaluatorId === user.id && e.projectId === id);
          
          return myEvaluations.length === 0 ? (
            <p>No evaluations submitted yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Teammate</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {myEvaluations.map(ev => {
                  const teammate = teammates.find(t => t.id === ev.teammate);
                  return (
                    <tr key={ev.id}>
                      <td>{teammate?.name || 'Unknown'}</td>
                      <td>{'★'.repeat(ev.rating)}{'☆'.repeat(5 - ev.rating)}</td>
                      <td>{ev.feedback || 'No feedback'}</td>
                      <td>{new Date(ev.timestamp).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })()}
      </div>
    </div>
  );
}

export default PeerEvaluationPage;
