// src/pages/AllProductsAdmin.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './admin-products.css';
import BASE_URL from '../config';

const ITEMS_PER_PAGE = 12;

const AllProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    imageUrl: "",
    id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchProducts = useCallback(() => {
    axios.get(`${BASE_URL}/api/products/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Product deleted");
      fetchProducts();
    } catch (err) {
      alert("❌ Failed to delete product.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/api/products/${formData.id}`, {
          ...formData,
          category: { id: parseInt(formData.categoryId) }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("✅ Product updated");
      } else {
        await axios.post(`${BASE_URL}/api/products/add`, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          quantity: formData.quantity,
          category: { id: parseInt(formData.categoryId) }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (formData.imageUrl) {
          await axios.put(`${BASE_URL}/api/products/update-image/${formData.name}`, {
            imageUrl: formData.imageUrl
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        alert("✅ Product added successfully!");
      }

      fetchProducts();
      setFormData({
        name: "", description: "", price: "", quantity: "",
        categoryId: "", imageUrl: "", id: null
      });
      setIsEditing(false);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      categoryId: product.category?.id || ""
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="admin-products-container">
      <h2>🛒 All Products</h2>

      {/* <button className="add-btn" onClick={() => {
        setShowForm(!showForm);
        setFormData({ name: "", description: "", price: "", quantity: "", categoryId: "", imageUrl: "", id: null });
        setIsEditing(false);
      }}>
        ➕ {isEditing ? "Edit Product" : "Add Product"}
      </button> */}

      {showForm && (
        <div className="admin-form-container">
          <form className="product-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Product Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="text" placeholder="Description" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            <input type="number" placeholder="Price" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            <input type="number" placeholder="Quantity" value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
            <input type="number" placeholder="Category ID (e.g., 1 = Fashion)" value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} required />
            <input type="text" placeholder="Image URL (optional)" value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
          </form>
        </div>
      )}

      <div className="products-grid">
        {paginatedProducts.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(p)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(p.id)}>❌ Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProductsAdmin;
