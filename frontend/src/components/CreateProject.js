import React, { useState } from 'react';
import { createProject, getAllUsers } from '../services/api';

function CreateProject({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    teams: [{ name: '', members: [] }]
  });
  const [memberEmail, setMemberEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      onSuccess();
    } catch (err) {
      alert('Error creating project');
    }
  };

  const addTeam = () => {
    setFormData({ ...formData, teams: [...formData.teams, { name: '', members: [] }] });
  };

  return (
    <div className="card">
      <h3>Create New Project</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        
        <h4>Teams</h4>
        {formData.teams.map((team, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Team Name"
              value={team.name}
              onChange={(e) => {
                const teams = [...formData.teams];
                teams[idx].name = e.target.value;
                setFormData({ ...formData, teams });
              }}
              required
            />
            <p>Members: {team.members.length}</p>
          </div>
        ))}
        <button type="button" onClick={addTeam} className="btn btn-success">Add Team</button>
        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
