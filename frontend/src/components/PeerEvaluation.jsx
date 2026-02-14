import React, { useState } from 'react';
import { createEvaluation } from '../services/api';

function PeerEvaluation({ project, user, onSuccess }) {
  const [formData, setFormData] = useState({
    project: project._id,
    evaluatee: '',
    criteria: [
      { name: 'Communication', score: 5 },
      { name: 'Contribution', score: 5 },
      { name: 'Quality of Work', score: 5 },
      { name: 'Teamwork', score: 5 }
    ],
    comments: ''
  });

  const teamMembers = project.teams
    .flatMap(team => team.members)
    .filter(member => member._id !== user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvaluation(formData);
      alert('Evaluation submitted successfully');
      onSuccess();
    } catch (err) {
      alert('Error submitting evaluation');
    }
  };

  const updateScore = (index, score) => {
    const criteria = [...formData.criteria];
    criteria[index].score = parseInt(score);
    setFormData({ ...formData, criteria });
  };

  return (
    <div className="card">
      <h3>Peer Evaluation</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.evaluatee}
          onChange={(e) => setFormData({ ...formData, evaluatee: e.target.value })}
          required
        >
          <option value="">Select Team Member</option>
          {teamMembers.map(member => (
            <option key={member._id} value={member._id}>{member.name}</option>
          ))}
        </select>

        <h4>Rate on scale of 0-10</h4>
        {formData.criteria.map((criterion, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <label>{criterion.name}: {criterion.score}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={criterion.score}
              onChange={(e) => updateScore(idx, e.target.value)}
            />
          </div>
        ))}

        <textarea
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
        />

        <button type="submit" className="btn btn-success">Submit Evaluation</button>
      </form>
    </div>
  );
}

export default PeerEvaluation;
