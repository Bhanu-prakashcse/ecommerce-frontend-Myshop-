import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    sales: 0,
    users: 0,
    products: 0,
    orders: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error("Admin token not found.");
      return;
    }

    // Fetch orders
  axios.get('http://localhost:8080/api/orders/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    const orders = res.data;

  // Calculate total sales from items inside each order
  const totalSales = orders.reduce((sum, order) => {
    const orderTotal = order.items?.reduce((s, item) => s + (item.price || 0), 0);
    return sum + orderTotal;
  }, 0);

  // Get 5 most recent orders (reversed)
  const recent = orders.slice(-5).reverse();

  // Update dashboard summary
  setSummary(prev => ({
    ...prev,
    sales: totalSales,
    orders: orders.length
  }));

  // Update recent orders state
  setRecentOrders(recent);
})
.catch(err => {
  console.error("Orders Error:", err);
});


    // Fetch products
    axios.get('http://localhost:8080/api/products/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const products = res.data;
      setSummary(prev => ({
        ...prev,
        products: products.length
      }));
    })
    .catch(err => {
      console.error("Products Error:", err);
    });
  }, [token]);

  // ✅ Moved to top-level useEffect
  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:8080/api/user/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const customersOnly = res.data.filter(user => user.role === 'CUSTOMER');
      setSummary(prev => ({
        ...prev,
        users: customersOnly.length
      }));
    })
    .catch(err => {
      console.error("Users Error:", err);
    });
  }, [token]);

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">💰 <p>Sales</p><h3>₹{summary.sales}</h3></div>
        <div className="summary-card">👥 <p>Users</p><h3>{summary.users || 'N/A'}</h3></div>
        <div className="summary-card">📦 <p>Products</p><h3>{summary.products}</h3></div>
        <div className="summary-card">📄 <p>Orders</p><h3>{summary.orders}</h3></div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/products" className="admin-card">
          <span role="img" aria-label="products">📦</span>
          <h3>Manage Products</h3>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <span role="img" aria-label="orders">📄</span>
          <h3>View Orders</h3>
        </Link>
      </div>

      <div className="recent-orders">
        <h2>🕒 Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id || index}>
                    <td>{order.id}</td>
                    <td>{order.user?.username || 'N/A'}</td>
                    <td>
                      {order.items?.map(item => (
                        <div key={item.id}>
                          {item.product?.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>
                      ₹
                      {order.items?.reduce((sum, item) => sum + (item.price || 0), 0)}
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
