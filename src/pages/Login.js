import React, { useState } from 'react';
import axios from 'axios';
import './AuthWrapper.css';
import  BASE_URL from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      console.log("Response data:", response.data);

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      alert("Login successful!");
      console.log("Redirecting role:", role);

      // ✅ Redirect based on role
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-form">
      <h2>🔑 Login to MyShop</h2>
      <p>Access exclusive deals and shop smarter.</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
