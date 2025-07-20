// src/pages/AllOrdersAdmin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';

const AllOrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  // Define fetchOrders as a separate function
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('http://localhost:8080/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders(); // Load all orders on page load
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("🗑️ Order deleted successfully!");
  
      // Refresh orders
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("❌ Failed to delete order");
    }
  };

  return (
    <div className="admin-list">
      <h2>📑 All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button className="delete-order-btn" onClick={() => handleDeleteOrder(order.id)}>
            🗑️ Delete Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllOrdersAdmin;
