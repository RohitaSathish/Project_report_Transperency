import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#c9a882' }}>
            Group Project Management System
          </h1>
          <p style={{ fontSize: '20px', color: '#6b5744', marginBottom: '40px' }}>
            Streamline team collaboration, track progress, and evaluate contributions
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '50px' }}>
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-primary"
              style={{ padding: '15px 40px', fontSize: '18px' }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="btn btn-success"
              style={{ padding: '15px 40px', fontSize: '18px' }}
            >
              Register
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '50px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ color: '#a8956b', marginBottom: '10px' }}>Project Management</h3>
              <p style={{ color: '#6b5744', fontSize: '14px' }}>Create and manage group projects with ease</p>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>✓</div>
              <h3 style={{ color: '#a8956b', marginBottom: '10px' }}>Task Tracking</h3>
              <p style={{ color: '#6b5744', fontSize: '14px' }}>Monitor individual and team progress</p>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>⭐</div>
              <h3 style={{ color: '#a8956b', marginBottom: '10px' }}>Peer Evaluation</h3>
              <p style={{ color: '#6b5744', fontSize: '14px' }}>Fair assessment through peer reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
