import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../services/validators.js';


function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!isValidEmail(form.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!isValidPassword(form.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('isAuth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Task Manager Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="err-msg">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="err-msg">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;