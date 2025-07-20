import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getCartItems = () =>
  axios.get(`${API_BASE}/cart`, { headers });

export const addToCart = (productId, quantity) =>
  axios.post(
    `${API_BASE}/cart/add`,
    { productId, quantity },
    { headers }
  );
