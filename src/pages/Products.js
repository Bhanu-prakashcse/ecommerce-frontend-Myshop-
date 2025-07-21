import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import BASE_URL from '../config';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");

  useEffect(() => {
    let url = `${BASE_URL}/api/products/all`;
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, [categoryId]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${BASE_URL}/api/cart/add?productId=${productId}&quantity=1`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMsg("✅ Product added to cart!");
    } catch (err) {
      setMsg("❌ Failed to add to cart.");
    }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="products-page">
      <h2>{categoryId ? "🧩 Filtered Products" : "🛍️ All Products"}</h2>
      {msg && <p className="status-message">{msg}</p>}

      {products.length === 0 ? (
        <p className="no-products">🚫 No products found for this category.</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`} className="product-card-link">
                  <img
                    src={
                      product.imageUrl && product.imageUrl.startsWith("http")
                        ? product.imageUrl
                        : `https://source.unsplash.com/300x200/?${product.name}`
                    }
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price.toLocaleString()}</p>
                    <p className="desc">{product.description}</p>
                    <p className="category">📦 {product.category?.name}</p>
                  </div>
                </Link>
              <button onClick={() => handleAddToCart(product.id)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
