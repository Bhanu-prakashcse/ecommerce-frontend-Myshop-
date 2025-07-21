import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';
import BASE_URL from '../config';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  useEffect(() => {
    if (keyword) {
      axios.get(`${BASE_URL}/api/products/search?keyword=${keyword}`)
      .then(res => setProducts(res.data))
        .catch(err => console.error("Failed to fetch search results:", err));
    }
  }, [keyword]);

  return (
    <div className="search-results-page">
      <h2>🔎 Search Results for: "{keyword}"</h2>
      {products.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              {/* ✅ Wrap the product in Link to detail page */}
              <Link to={`/products/${product.id}`} className="product-link">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <p>{product.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
