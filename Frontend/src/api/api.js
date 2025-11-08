import axios from "axios";

// Base configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

// Cart APIs with improved error handling
export const addToCartAPI = async (data) => {
  try {
    const response = await API.post("/cart/add", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add item to cart');
  }
};

export const getCartAPI = async (userId) => {
  try {
    const response = await API.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cart');
  }
};

export const removeFromCartAPI = async (data) => {
  try {
    const response = await API.delete("/cart/remove", { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
  }
};

export const clearCartAPI = async (userId) => {
  try {
    const response = await API.delete(`/cart/clear/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to clear cart');
  }
};

// ADD THIS: Update cart item API
export const updateCartAPI = async (data) => {
  try {
    const response = await API.put("/cart/update", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update cart item');
  }
};

// Checkout API
export const processCheckout = async (data) => {
  try {
    const response = await API.post("/checkout", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Checkout failed');
  }
};

// Product APIs
export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};

export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export default API;