import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeMockData } from '../services/mockData';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === formData.email);
    
    if (user) {
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      initializeMockData(user);
      
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'faculty') navigate('/faculty');
      else navigate('/dashboard');
    } else {
      const mockUser = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.email.includes('admin') ? 'admin' : formData.email.includes('faculty') ? 'faculty' : 'student'
      };
      
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      initializeMockData(mockUser);
      
      if (mockUser.role === 'admin') navigate('/admin');
      else if (mockUser.role === 'faculty') navigate('/faculty');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: '#c9a882' }} onClick={() => navigate('/register')}>
          Need an account? Register
        </p>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: '#c9a882' }} onClick={() => navigate('/')}>
          ← Back to Home
        </p>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#6b5744' }}>
          <p><strong>Login Tips:</strong></p>
          <p>• Use email with 'admin' for Admin role</p>
          <p>• Use email with 'faculty' for Faculty role</p>
          <p>• Any other email for Student role</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
