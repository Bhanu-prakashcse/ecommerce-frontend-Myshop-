import React, { useEffect, useState , useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cart/view", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/cart/place-order", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMsg(res.data); // Success message
      fetchCart(); // Clear the cart from UI
      setTimeout(() => {
        navigate("/order-success"); // ✅ Redirect after success
      }, 1000);
    } catch (err) {
      console.error("Order failed", err);
      setMsg("Failed to place order.");
    }

    setTimeout(() => setMsg(''), 3000);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {msg && <p className="message">{msg}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ₹{getTotal()}</h3>

                      {/* Checkout Section */}
            <div className="checkout-section">
              <h3><center>Checkout Details</center></h3>

              <input
                type="text"
                placeholder="🏠 Enter Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                type="text"
                placeholder="📍 Enter Pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                  if (e.target.value.length === 6) {
                    setDeliveryEstimate("Delivery in 5 days");
                  } else {
                    setDeliveryEstimate("");
                  }
                }}
              />

              {deliveryEstimate && <p className="delivery-estimate">{deliveryEstimate}</p>}

              <h4>Select Payment Method:</h4>
              <div className="payment-options">
                {["PhonePe", "GooglePay", "Paytm", "Debit Card", "Cash on Delivery"].map(option => (
                  <button
                    key={option}
                    onClick={() => setPaymentMethod(option)}
                    className={`payment-btn ${paymentMethod === option ? "selected" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>


              {paymentMethod && address.trim() && pincode.length === 6 && (
                <button onClick={handlePlaceOrder} className="final-place-order">
                  ✅ Confirm & Place Order
                </button>
              )}
            </div>

        </>
      )}
    </div>
  );
};

export default Cart;
