import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="order-success-page">
      <div className="success-box">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with <strong>MyShop</strong>.</p>
        <button onClick={handleContinue}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderSuccess;
