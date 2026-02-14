import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (registeredUsers.find(u => u.email === formData.email)) {
      alert('Email already registered! Please login.');
      navigate('/login');
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-success">Register</button>
        </form>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: '#c9a882' }} onClick={() => navigate('/login')}>
          Have an account? Login
        </p>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: '#c9a882' }} onClick={() => navigate('/')}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default Register;
