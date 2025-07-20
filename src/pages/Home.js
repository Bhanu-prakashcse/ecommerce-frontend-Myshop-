// src/pages/Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const images = [
  "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
  "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?cs=srgb&dl=pexels-pixabay-276528.jpg&fm=jpg",
  "https://www.kindpng.com/picc/m/127-1273798_export-genius-country-wise-analysis-mobile-phones-new.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhObs-f6YZv5uzhX1p3BuRQQykANQ0QK_yG2355WHvGs2GL1-OohpIxlq152l6DFS5wBTUDPiJWTcDPMDpHNn7vcxx3CxlZOmphmIkG0ld16fQct2lSotzc5YfQ8jx5X3_geIe8g1LTn8c/s1600/slide-img-01.png"
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };

  const handleShop = () => {
    if (token) navigate("/products");
    else navigate("/login");
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="home">
      <div className="hero-section">
      <Slider {...settings} className="hero-slider">
        {images.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={`slide-${idx}`} className="hero-image" />
          </div>
        ))}
      </Slider>
      <div className="hero-content">
        <h1>Welcome to <span>MyShop</span></h1>
        <p>Your one-stop destination for everything you love 💞</p>
        <button onClick={handleShop}>🛍️ Start Shopping</button>
      </div>
      </div>

      <h2 className="section-title">🛒 Why Shop With Us?</h2>
      <div className="features">
        <div className="feature-card">
          <h3>🔥 Hot Deals</h3>
          <p>Get the best offers on top brands daily.</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Lightning-fast delivery to your doorstep.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Payments</h3>
          <p>100% secure payment gateways.</p>
        </div>
      </div>

      <h2 className="section-title">🧩 Explore Categories</h2>
      <div className="categories">
        {[
          { name: "Fashion", image: "https://img.freepik.com/free-photo/fashion-portrait-young-elegant-woman_1328-2742.jpg" },
          { name: "Furniture", image: "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/c153799b-2716-4a2d-86a6-e8e4c2efc027/whatsapp-image-2023-02-19-at-11-46-23-pm.jpeg" },
          { name: "Gadgets", image: "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?semt=ais_hybrid&w=740" },
          { name: "Mobiles", image: "https://media.licdn.com/dms/image/v2/D4D12AQG0NMBwOtr-IA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712297539871?e=2147483647&v=beta&t=E-ccKcy0Sr4Nz5NqcEM0sW70Pc6w-tB1_PucQjjN3OM" },
          { name: "Groceries", image: "https://png.pngtree.com/png-clipart/20250111/original/pngtree-shopping-cart-filled-with-groceries-png-image_19085924.png" },
        ].map((item, i) => (
          <div
            className="category-card"
            key={i}
            onClick={() => handleCategoryClick(item.name)}

            style={{ cursor: "pointer" }}
          >
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
