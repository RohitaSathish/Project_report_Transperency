import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject, getAllUsers } from '../services/api';

function CreateProjectPage({ user }) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    deadline: '',
    teamSize: 4,
    evaluationCriteria: ['Communication', 'Contribution', 'Quality of Work', 'Teamwork'],
    teams: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const { data } = await getAllUsers();
      setStudents(data.filter(u => u.role === 'student'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      alert('Project created successfully!');
      navigate('/faculty');
    } catch (err) {
      alert('Error creating project');
    }
  };

  const addTeam = () => {
    setFormData({
      ...formData,
      teams: [...formData.teams, { name: `Team ${formData.teams.length + 1}`, members: [] }]
    });
  };

  const addMemberToTeam = (teamIdx, studentId) => {
    const teams = [...formData.teams];
    if (!teams[teamIdx].members.includes(studentId)) {
      teams[teamIdx].members.push(studentId);
      setFormData({ ...formData, teams });
    }
  };

  const removeMemberFromTeam = (teamIdx, studentId) => {
    const teams = [...formData.teams];
    teams[teamIdx].members = teams[teamIdx].members.filter(id => id !== studentId);
    setFormData({ ...formData, teams });
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/faculty')} className="btn btn-primary">Back to Dashboard</button>
      
      <div className="card">
        <h1>Create New Project</h1>
        <form onSubmit={handleSubmit}>
          <label>Project Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label>Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <label>Subject *</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />

          <label>Deadline *</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            required
          />

          <label>Team Size</label>
          <input
            type="number"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
            min="2"
          />

          <label>Evaluation Criteria (comma separated)</label>
          <input
            type="text"
            value={formData.evaluationCriteria.join(', ')}
            onChange={(e) => setFormData({ ...formData, evaluationCriteria: e.target.value.split(',').map(s => s.trim()) })}
          />

          <h3>Teams & Student Assignment</h3>
          <button type="button" onClick={addTeam} className="btn btn-success">Add Team</button>

          {formData.teams.map((team, idx) => (
            <div key={idx} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0' }}>
              <h4>{team.name}</h4>
              <input
                type="text"
                value={team.name}
                onChange={(e) => {
                  const teams = [...formData.teams];
                  teams[idx].name = e.target.value;
                  setFormData({ ...formData, teams });
                }}
              />
              
              <div style={{ marginTop: '10px' }}>
                <strong>Assigned Students ({team.members.length}):</strong>
                {team.members.map(memberId => {
                  const student = students.find(s => s._id === memberId);
                  return student ? (
                    <div key={memberId} style={{ display: 'inline-block', margin: '5px', padding: '5px 10px', background: '#007bff', color: 'white', borderRadius: '4px' }}>
                      {student.name}
                      <button type="button" onClick={() => removeMemberFromTeam(idx, memberId)} style={{ marginLeft: '5px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>×</button>
                    </div>
                  ) : null;
                })}
              </div>

              <select onChange={(e) => { addMemberToTeam(idx, e.target.value); e.target.value = ''; }}>
                <option value="">Add Student</option>
                {students.map(student => (
                  <option key={student._id} value={student._id}>{student.name}</option>
                ))}
              </select>
            </div>
          ))}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Create Project</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectPage;
