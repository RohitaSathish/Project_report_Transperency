import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(250, 248, 245, 0.95)', boxShadow: '0 2px 10px rgba(139, 115, 85, 0.1)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#8b7355', margin: 0, fontSize: '28px', fontWeight: '600' }}>ProjectHub</h2>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-primary"
              style={{ padding: '12px 30px', fontSize: '16px' }}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container" style={{ maxWidth: '1200px', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            marginBottom: '20px', 
            color: '#6b5744',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Collaborative Project Management
          </h1>
          <p style={{ 
            fontSize: '22px', 
            color: '#8b7355', 
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Empower your team with seamless collaboration, real-time tracking, and data-driven insights
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button 
              onClick={() => navigate('/register')} 
              className="btn btn-success"
              style={{ 
                padding: '18px 45px', 
                fontSize: '18px',
                boxShadow: '0 4px 15px rgba(168, 149, 107, 0.3)'
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '80px' }}>
          <div style={{ 
            background: '#faf8f5', 
            padding: '40px 30px', 
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'linear-gradient(135deg, #c9a882, #a8956b)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '20px'
            }}>📊</div>
            <h3 style={{ color: '#6b5744', marginBottom: '15px', fontSize: '22px' }}>Project Management</h3>
            <p style={{ color: '#8b7355', lineHeight: '1.7', fontSize: '15px' }}>
              Create and organize group projects with customizable teams, deadlines, and evaluation criteria for optimal workflow
            </p>
          </div>

          <div style={{ 
            background: '#faf8f5', 
            padding: '40px 30px', 
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'linear-gradient(135deg, #a8956b, #8b7355)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '20px'
            }}>✓</div>
            <h3 style={{ color: '#6b5744', marginBottom: '15px', fontSize: '22px' }}>Task Tracking</h3>
            <p style={{ color: '#8b7355', lineHeight: '1.7', fontSize: '15px' }}>
              Monitor individual and team progress with real-time status updates, submission logs, and deadline management
            </p>
          </div>

          <div style={{ 
            background: '#faf8f5', 
            padding: '40px 30px', 
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)',
            border: '1px solid #e8d5c4',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'linear-gradient(135deg, #c4917a, #a8956b)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '20px'
            }}>⭐</div>
            <h3 style={{ color: '#6b5744', marginBottom: '15px', fontSize: '22px' }}>Peer Evaluation</h3>
            <p style={{ color: '#8b7355', lineHeight: '1.7', fontSize: '15px' }}>
              Enable fair assessment through structured peer reviews with anonymous feedback options and rating systems
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          marginTop: '80px', 
          background: '#faf8f5',
          padding: '60px',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(139, 115, 85, 0.15)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '48px', color: '#c9a882', marginBottom: '10px', fontWeight: '700' }}>0</h2>
              <p style={{ color: '#8b7355', fontSize: '16px' }}>Active Projects</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', color: '#a8956b', marginBottom: '10px', fontWeight: '700' }}>0</h2>
              <p style={{ color: '#8b7355', fontSize: '16px' }}>Students</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', color: '#c4917a', marginBottom: '10px', fontWeight: '700' }}>0</h2>
              <p style={{ color: '#8b7355', fontSize: '16px' }}>Faculty Members</p>
            </div>
            <div>
              <h2 style={{ fontSize: '48px', color: '#8b7355', marginBottom: '10px', fontWeight: '700' }}>New</h2>
              <p style={{ color: '#8b7355', fontSize: '16px' }}>Platform</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '42px', color: '#6b5744', marginBottom: '20px', fontWeight: '600' }}>
            Ready to Transform Your Team?
          </h2>
          <p style={{ fontSize: '18px', color: '#8b7355', marginBottom: '30px' }}>
            Contact admin for access credentials
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="btn btn-success"
            style={{ 
              padding: '18px 50px', 
              fontSize: '18px',
              boxShadow: '0 4px 20px rgba(168, 149, 107, 0.3)'
            }}
          >
            Login Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'rgba(250, 248, 245, 0.95)', padding: '30px 0', marginTop: '60px', borderTop: '1px solid #e8d5c4' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#8b7355', margin: 0 }}>© 2026 ProjectHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
