import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

function Navbar({ onAddClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span
        className="nav-brand"
        onClick={() => navigate('/dashboard')}
      >
        📋 Task Manager
      </span>

      <div className="nav-actions">
        {onAddClick && (
          <button
            className="btn-primary"
            onClick={onAddClick}
          >
            + Add Task
          </button>
        )}

        <button
          className="btn-icon"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <button
          className="btn-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;