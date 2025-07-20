import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // 👈 NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true); // 👈 Start loader
    setMsg("");        // 👈 Clear previous msg

    try {
      await axios.post("http://localhost:8080/api/contact/send", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to send message.");
    }

    setLoading(false); // 👈 Stop loader

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-left">
        <img
          src="https://t3.ftcdn.net/jpg/03/60/19/70/240_F_360197061_gi83nQH8Fs2GtIAXDWT3HmswfIARlvxI.jpg"
          alt="Contact Illustration"
        />
      </div>

      <div className="contact-right">
        <h2>📞 Contact Us</h2>

        {/* Loader or status message */}
        {loading ? (
          <p className="contact-msg" style={{ color: "orange" }}>
            ⏳ Sending message...
          </p>
        ) : (
          msg && <p className="contact-msg">{msg}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Describe your issue..."
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            🚀 Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
