import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function AdminStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', department: '', rollNumber: '' });

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
      const list = data.filter(u => u.role === 'student').sort((a, b) =>
        (a.rollNumber || '').localeCompare(b.rollNumber || '', undefined, { numeric: true })
      );
      setStudents(list);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (editMode) {
        await axios.put(`${API}/admin/users/${editId}`, formData, { headers });
        alert('Student updated successfully!');
      } else {
        await axios.post(`${API}/admin/users`, { ...formData, role: 'student' });
        alert('Student added successfully!');
      }
      handleCancel();
      loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving student');
    }
  };

  const handleEdit = (student) => {
    setFormData({ name: student.name, email: student.email, password: '', department: student.department || '', rollNumber: student.rollNumber || '' });
    setEditId(student._id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', password: '', department: '', rollNumber: '' });
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
  };

  const thStyle = { background: '#f5e6d3', color: '#6b5744', padding: '12px', textAlign: 'left' };
  const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #f0e6d8', color: '#5a4a3a' };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#6b5744' }}>Student Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { handleCancel(); setShowForm(!showForm); }} className="btn btn-primary">
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>
          <button onClick={() => navigate('/admin')} className="btn btn-secondary">Back to Dashboard</button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '25px' }}>
          <h2 style={{ color: '#6b5744', marginBottom: '20px' }}>{editMode ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label>Full Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label>Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div>
                <label>Password *</label>
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required={!editMode} minLength="6" placeholder={editMode ? 'Leave blank to keep current' : ''} />
              </div>
              <div>
                <label>Roll Number *</label>
                <input type="text" value={formData.rollNumber} onChange={e => setFormData({ ...formData, rollNumber: e.target.value })} required />
              </div>
              <div>
                <label>Department *</label>
                <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required>
                  <option value="">Select Department</option>
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                  <option>Electrical</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">{editMode ? 'Update Student' : 'Add Student'}</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2 style={{ color: '#6b5744', marginBottom: '15px' }}>All Students ({students.length})</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Roll Number</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#8b7355' }}>No students added yet</td></tr>
            ) : (
              students.map(s => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.rollNumber || 'N/A'}</td>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.department || 'N/A'}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEdit(s)} className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '13px' }}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStudents;
