import React, { useState, useEffect } from 'react';

function DebugStorage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(registeredUsers);
  };

  const clearAll = () => {
    if (window.confirm('Clear all localStorage data?')) {
      localStorage.clear();
      setUsers([]);
      alert('All data cleared!');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🔍 Debug: localStorage Viewer</h1>
        <p>This page shows what's stored in your browser's localStorage</p>
        
        <div style={{ marginTop: '20px' }}>
          <button onClick={loadUsers} className="btn btn-primary">Refresh</button>
          <button onClick={clearAll} className="btn btn-danger">Clear All Data</button>
        </div>

        <h2 style={{ marginTop: '30px' }}>Registered Users ({users.length})</h2>
        
        {users.length === 0 ? (
          <div style={{ padding: '20px', background: '#f5e6d3', borderRadius: '8px', marginTop: '10px' }}>
            <p>❌ No users found in localStorage!</p>
            <p>Solution: Login as admin and add students/faculty</p>
          </div>
        ) : (
          <table style={{ marginTop: '10px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><code>{user.password}</code></td>
                  <td><strong>{user.role}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: '30px', padding: '20px', background: '#f5e6d3', borderRadius: '8px' }}>
          <h3>How to Test Login:</h3>
          <ol>
            <li>Copy an email and password from the table above</li>
            <li>Go to the Login page</li>
            <li>Paste the exact email and password</li>
            <li>Click Sign In</li>
            <li>Check browser console (F12) for debug messages</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DebugStorage;
