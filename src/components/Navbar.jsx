import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials, getAvatarStyles } from '../utils/avatarUtils';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-accent">CV</span>Forge
        </Link>

        <div className="nav-links">
          <Link to="/builder" className="nav-item">Build CV</Link>
          {user && <Link to="/dashboard" className="nav-item">Dashboard</Link>}
          
          {user ? (
            <div className="user-menu">
              <div 
                className="user-avatar"
                style={getAvatarStyles(user)}
                title={user.displayName || user.email || 'User'}
              >
                {!user?.photoURL ? (
                  <span className="avatar-initials">
                    {getInitials(user?.displayName || user?.email || '')}
                  </span>
                ) : (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="avatar-image"
                    onError={(e) => {
                      // If image fails to load, show initials instead
                      const target = e.target;
                      target.style.display = 'none';
                      const initialsElement = target.nextElementSibling;
                      if (initialsElement) {
                        initialsElement.style.display = 'flex';
                      }
                    }}
                  />
                )}
                {user?.photoURL && (
                  <span className="avatar-initials" style={{ display: 'none' }}>
                    {getInitials(user?.displayName || user?.email || '')}
                  </span>
                )}
              </div>
              <div className="dropdown">
                <div className="user-info">
                  {user.displayName && <div className="user-name">{user.displayName}</div>}
                  <div className="user-email">{user.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={logout}>Sign out</div>
              </div>
            </div>
          ) : (
            <button onClick={handleLogin} className="nav-cta">
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
