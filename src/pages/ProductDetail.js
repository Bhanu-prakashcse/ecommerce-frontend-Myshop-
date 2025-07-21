// src/pages/ProductDetails.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import BASE_URL from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Scroll to top on new product load
    window.scrollTo(0, 0);

    axios.get(`${BASE_URL}/api/products/${id}`)
    .then(res => {
        setProduct(res.data);

        // Fetch related items (same category but exclude current item)
        axios.get(`${BASE_URL}/api/products/category/${res.data.category.name}`)
        .then(r => {
            const filtered = r.data.filter(p => p.id !== res.data.id);
            setRelated(filtered);
          });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/cart/add?productId=${id}&quantity=1`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product added to cart!");
    } catch (err) {
      alert("Failed to add to cart.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <img
          src={product.imageUrl || `https://source.unsplash.com/400x300/?${product.name}`}
          alt={product.name}
        />
        <div className="info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price.toLocaleString()}</p>
          <p className="desc">{product.description}</p>
          <div className="actions">
          <button onClick={handleAddToCart}>🛒 Add to Cart</button>
          <button>⚡ Buy Now</button>
        </div>
        </div>
      </div>

      <div className="related">
        <h3>🟢 Related Items</h3>
        <div className="related-list">
          {related.map(p => (
            <Link to={`/products/${p.id}`} key={p.id} className="related-card">
              <img
                src={p.imageUrl || `https://source.unsplash.com/300x200/?${p.name}`}
                alt={p.name}
              />
              <p>{p.name}</p>
              <p>₹{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
