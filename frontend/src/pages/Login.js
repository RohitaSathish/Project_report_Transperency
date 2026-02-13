import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock login/register without backend
    if (isLogin) {
      // Mock login
      const mockUser = {
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.email.includes('admin') ? 'admin' : formData.email.includes('faculty') ? 'faculty' : 'student'
      };
      
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      if (mockUser.role === 'admin') navigate('/admin');
      else if (mockUser.role === 'faculty') navigate('/faculty');
      else navigate('/dashboard');
    } else {
      // Mock register
      alert('Registration successful! Please login.');
      setIsLogin(true);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
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
          {!isLogin && (
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          )}
          <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </p>
        {isLogin && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#6c757d' }}>
            <p><strong>Login Tips:</strong></p>
            <p>• Use email with 'admin' for Admin role</p>
            <p>• Use email with 'faculty' for Faculty role</p>
            <p>• Any other email for Student role</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
