import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Admin login bypass
    if (formData.email.trim().includes('admin')) {
      const admin = { id: 'admin-1', name: 'Admin', email: formData.email, role: 'admin' };
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('user', JSON.stringify(admin));
      setUser(admin);
      navigate('/admin');
      return;
    }

    try {
      const { data } = await axios.post(`${API}/auth/login`, {
        email: formData.email.trim(),
        password: formData.password
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      if (data.user.role === 'faculty') navigate('/faculty');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Cannot connect to server. Make sure backend is running.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ background: '#faf8f5', borderRadius: '16px', padding: '50px 40px', boxShadow: '0 10px 40px rgba(139, 115, 85, 0.15)', border: '1px solid #e8d5c4' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', color: '#6b5744', marginBottom: '10px', fontWeight: '600' }}>Welcome Back</h2>
            <p style={{ color: '#8b7355', fontSize: '16px' }}>Sign in to continue to ProjectHub</p>
          </div>

          {error && (
            <div style={{ background: '#ffe0e0', border: '1px solid #ffb3b3', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#cc0000', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#6b5744', fontWeight: '500', fontSize: '14px' }}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e8d5c4', borderRadius: '8px', fontSize: '15px', background: 'white' }}
                onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#6b5744', fontWeight: '500', fontSize: '14px' }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e8d5c4', borderRadius: '8px', fontSize: '15px', background: 'white' }}
                onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
              Sign In
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <p onClick={() => navigate('/')} style={{ color: '#8b7355', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              ← Back to Home
            </p>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#f5e6d3', borderRadius: '8px', border: '1px solid #e8d5c4' }}>
            <p style={{ color: '#6b5744', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Login Information:</p>
            <p style={{ color: '#8b7355', fontSize: '12px', marginBottom: '5px' }}>• Admin: any email with 'admin' (e.g. admin@example.com)</p>
            <p style={{ color: '#8b7355', fontSize: '12px' }}>• Faculty/Students: use credentials set by admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
