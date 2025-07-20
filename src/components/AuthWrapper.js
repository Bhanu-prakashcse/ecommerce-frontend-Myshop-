import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { Link } from 'react-router-dom';
import './AuthWrapper.css';

const AuthWrapper = ({ children }) => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      backgroundColor: 0x1e1e60,
      color: 0xffffff,
    });

    return () => {
      effect.destroy();
    };
  }, []);

  return (
    <div className="auth-wrapper" ref={vantaRef}>
      <nav className="auth-nav">
        <h2 className="auth-logo">👋 Welcome to MyShop</h2>
        <div>
          <Link to="/register" className="auth-link">Sign Up</Link>
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </nav>

      <div className="auth-container">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
