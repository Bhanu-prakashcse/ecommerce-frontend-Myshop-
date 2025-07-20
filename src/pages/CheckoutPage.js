import React, { useState } from "react";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
  });
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Simulate delivery estimate logic
    if (e.target.name === "pincode" && e.target.value.length === 6) {
      const days = Math.floor(Math.random() * 5) + 3; // 3-7 days
      setDeliveryTime(`📦 Delivery in ${days} days`);
    }
  };

  const handlePlaceOrder = () => {
    alert(`Order Placed via ${paymentMethod}`);
    // Add order logic here
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        onChange={handleInputChange}
        required
      />
      <textarea
        name="address"
        placeholder="Delivery Address"
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        onChange={handleInputChange}
        maxLength={6}
        required
      />

      {deliveryTime && <p className="delivery-time">{deliveryTime}</p>}

      <div className="payment-section">
        <h3>💳 Select Payment Method</h3>
        <div className="payment-options">
          <button
            className={paymentMethod === "UPI" ? "active" : ""}
            onClick={() => setPaymentMethod("UPI")}
          >
            🪙 UPI (PhonePe / GPay / Paytm)
          </button>
          <button
            className={paymentMethod === "Debit Card" ? "active" : ""}
            onClick={() => setPaymentMethod("Debit Card")}
          >
            💳 Debit Card
          </button>
          <button
            className={paymentMethod === "COD" ? "active" : ""}
            onClick={() => setPaymentMethod("COD")}
          >
            💵 Cash on Delivery (COD)
          </button>
        </div>
      </div>

      {paymentMethod && (
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          ✅ Place Order
        </button>
      )}
    </div>
  );
}

export default CheckoutPage;
