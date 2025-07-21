import axios from "axios";
import BASE_URL from "../config";

const API_BASE = `${BASE_URL}/api`;

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
