import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthWrapper.css';
import BASE_URL from '../config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/auth/register?role=CUSTOMER`, {
        username,
        password,
      });

      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-form">
      <h2>🔐 Register Form</h2>
      <p>One stop platform for smarter online shopping.</p>

      <form onSubmit={handleRegister}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
