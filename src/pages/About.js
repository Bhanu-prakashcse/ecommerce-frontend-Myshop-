import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1>Welcome to MyShop</h1>
      <img
        src="https://i.postimg.cc/Gt6Hqh3H/Chat-GPT-Image-Jul-20-2025-04-13-44-PM.png"
        alt="Welcome Banner"
        className="about-banner"
      />
      <p className="tagline">
        Your trusted destination for fashion, electronics, furniture, and daily essentials.
      </p>

     

      <h2><center>Mission</center></h2>
      <div className="mission-slider">
        <div className="slide-track">
          <div className="slide">👗 Empower your style with trending fashion</div>
          <div className="slide">📱 Bring technology to your fingertips</div>
          <div className="slide">🪑 Redefine comfort with modern furniture</div>
          <div className="slide">🛒 Make shopping affordable & joyful</div>
          <div className="slide">⚡ Deliver happiness to your doorstep</div>
          <div className="slide">💡 Simplify your daily essentials</div>
        </div>
      </div>

      <div className="why-shop">
        <img
          src="https://i.postimg.cc/90DDdqh6/Chat-GPT-Image-Jul-20-2025-04-13-49-PM.png"
          alt="Why Shop"
        />
        <ul>
          <li>✔ Quality products from top-rated sellers</li>
          <li>✔ Secure payments & fast delivery</li>
          <li>✔ Easy returns & 24/7 customer support</li>
          <li>✔ Personalized shopping experience</li>
        </ul>
      </div>

      <div className="tech-section">
        <h2><center>Built with Latest Technology</center></h2>
        <ul>
            <li><strong>Frontend:</strong> Built with React.js for a fast, responsive, and dynamic user experience.</li>
            <li><strong>Backend:</strong> Powered by Spring Boot to deliver robust and scalable RESTful APIs.</li>
            <li><strong>Database:</strong> Uses MySQL for reliable data management and integrity.</li>
            <li><strong>Security:</strong> Implements JWT (JSON Web Tokens) for secure authentication and data protection.</li>
            <li><strong>Performance:</strong> Optimized with modern UI/UX practices for a seamless shopping experience.</li>
        </ul>
        </div>


    </div>
  );
};

export default About;
