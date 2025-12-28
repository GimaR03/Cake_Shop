// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_URL = API_BASE_URL;
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCTS_BY_CATEGORY: (categoryName) => `${API_BASE_URL}/api/products/category/${encodeURIComponent(categoryName)}`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;

