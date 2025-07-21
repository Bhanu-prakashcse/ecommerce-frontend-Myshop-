// src/pages/CategoryProducts.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import BASE_URL from "../config";

const CategoryProducts = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products/category/${name}`)
    .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, [name]);

  return (
    <div className="products-page">
      <h2>🧩 {name} Products</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map(product => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)} // 👈 On click
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.imageUrl || `https://source.unsplash.com/400x300/?${product.name}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p><strong>₹{product.price.toLocaleString()}</strong></p>
                <p>{product.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
