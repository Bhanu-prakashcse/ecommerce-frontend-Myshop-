import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8080/api/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // e.g. 13 Jul 2025, 10:08 AM
  };

  return (
    <div className="orders-page">
      <h2 style={{ color: "white" }}>📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <h4>Order:🆔{order.id}</h4>
            <p><strong>Status:</strong> {order.status || 'Pending'}</p>
            <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
            <p><strong>Expected Delivery:</strong> {order.expectedDelivery ? formatDate(order.expectedDelivery) : 'N/A'}</p>
            <p><strong>Total Items:</strong> {order.items?.length || 0}</p>
            <ul>
              {order.items?.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} - Qty: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
