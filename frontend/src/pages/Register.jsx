import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setUser }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: '',
    password: '',
    confirmPassword: '',
    department: '',
    rollNumber: '',
    employeeId: ''
  });
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: formData.department,
          rollNumber: formData.role === 'student' ? formData.rollNumber : undefined,
          employeeId: formData.role === 'faculty' ? formData.employeeId : undefined
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.message || 'Registration failed!');
        return;
      }
      
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Cannot connect to server!\n\nPlease ensure:\n1. Backend server is running (npm start in backend folder)\n2. MongoDB is running\n3. Backend is on http://localhost:5000');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e8d5c4',
    borderRadius: '8px',
    fontSize: '15px',
    background: 'white',
    transition: 'border 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#6b5744',
    fontWeight: '500',
    fontSize: '14px'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ 
          background: '#faf8f5', 
          borderRadius: '16px', 
          padding: '50px 40px',
          boxShadow: '0 10px 40px rgba(139, 115, 85, 0.15)',
          border: '1px solid #e8d5c4'
        }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', color: step >= 1 ? '#c9a882' : '#8b7355', fontWeight: '600' }}>Basic Info</span>
              <span style={{ fontSize: '12px', color: step >= 2 ? '#c9a882' : '#8b7355', fontWeight: '600' }}>Role</span>
              <span style={{ fontSize: '12px', color: step >= 3 ? '#c9a882' : '#8b7355', fontWeight: '600' }}>Details</span>
            </div>
            <div style={{ height: '4px', background: '#e8d5c4', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                background: 'linear-gradient(90deg, #c9a882, #a8956b)', 
                width: `${(step / 3) * 100}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', color: '#6b5744', marginBottom: '10px', fontWeight: '600' }}>Create Account</h2>
            <p style={{ color: '#8b7355', fontSize: '16px' }}>Step {step} of 3</p>
          </div>

          {/* Step 1: Name and Email */}
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div style={{ marginBottom: '25px' }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                Next →
              </button>
            </form>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <form onSubmit={handleNext}>
              <div style={{ marginBottom: '30px' }}>
                <label style={labelStyle}>I am a</label>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div 
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    style={{
                      padding: '20px',
                      border: `2px solid ${formData.role === 'student' ? '#c9a882' : '#e8d5c4'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: formData.role === 'student' ? '#f5e6d3' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: formData.role === 'student' ? '#c9a882' : '#e8d5c4',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px'
                      }}>🎓</div>
                      <div>
                        <h3 style={{ color: '#6b5744', margin: 0, fontSize: '18px' }}>Student</h3>
                        <p style={{ color: '#8b7355', margin: '5px 0 0 0', fontSize: '13px' }}>Register as a student</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData({ ...formData, role: 'faculty' })}
                    style={{
                      padding: '20px',
                      border: `2px solid ${formData.role === 'faculty' ? '#c9a882' : '#e8d5c4'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: formData.role === 'faculty' ? '#f5e6d3' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: formData.role === 'faculty' ? '#c9a882' : '#e8d5c4',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px'
                      }}>👨‍🏫</div>
                      <div>
                        <h3 style={{ color: '#6b5744', margin: 0, fontSize: '18px' }}>Faculty</h3>
                        <p style={{ color: '#8b7355', margin: '5px 0 0 0', fontSize: '13px' }}>Register as a faculty member</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                  ← Back
                </button>
                <button type="submit" disabled={!formData.role} className="btn btn-primary" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600', opacity: formData.role ? 1 : 0.5 }}>
                  Next →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Details (Student) */}
          {step === 3 && formData.role === 'student' && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Roll Number</label>
                <input
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength="6"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength="6"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-success" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                  Register
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Details (Faculty) */}
          {step === 3 && formData.role === 'faculty' && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Employee ID</label>
                <input
                  type="text"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength="6"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength="6"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#c9a882'}
                  onBlur={(e) => e.target.style.borderColor = '#e8d5c4'}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-success" style={{ flex: 1, padding: '16px', fontSize: '16px', fontWeight: '600' }}>
                  Register
                </button>
              </div>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <p style={{ color: '#8b7355', fontSize: '14px', marginBottom: '15px' }}>
              Already have an account?{' '}
              <span 
                onClick={() => navigate('/login')} 
                style={{ color: '#c9a882', cursor: 'pointer', fontWeight: '600' }}
              >
                Sign In
              </span>
            </p>
            <p 
              onClick={() => navigate('/')} 
              style={{ color: '#8b7355', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
            >
              ← Back to Home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
