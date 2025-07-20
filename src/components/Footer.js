// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <div>
        <h3>🛍️ MyShop</h3>
        <p>Empowering your shopping experience with quality and trust.</p>
        <p>💳 We accept UPI, Debit Cards & Cash On Delivery</p>
        <p>🛎️ 24/7 Customer Support</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/orders">Orders</a></li>
          </ul>
        </div>
        <div>
            <h4>Contact</h4>
            <p>📧 bhanucse16@gmail.com</p>
            <p>🔗 <a href="https://www.linkedin.com/in/dandu-bhanu-prakash-aa059326b/" target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p>💻 <a href="https://github.com/Bhanu-prakashcse" target="_blank" rel="noreferrer">GitHub</a></p>
            </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved @Bhanu.</p>
      </div>
    </footer>
  );
};

export default Footer;
