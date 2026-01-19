import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const createUser = (userData) => api.post('/users', userData);
export const getUser = (userId) => api.get(`/users/${userId}`);

// Availability APIs
export const createAvailability = (availabilityData) => api.post('/availabilities', availabilityData);
export const getAvailabilities = (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  const url = `/availabilities${params.toString() ? '?' + params.toString() : ''}`;
  console.log('Fetching availabilities from:', url);
  return api.get(url);
};
export const getAvailability = (availabilityId) => api.get(`/availabilities/${availabilityId}`);
export const updateAvailabilityStatus = (availabilityId, status) => 
  api.put(`/availabilities/${availabilityId}/status`, { status });

// Marketplace APIs
export const createMarketplaceItem = (itemData) => api.post('/marketplace', itemData);
export const getMarketplaceItems = (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  return api.get(`/marketplace?${params.toString()}`);
};
export const getMarketplaceItem = (itemId) => api.get(`/marketplace/${itemId}`);
export const updateMarketplaceItemStatus = (itemId, status) => 
  api.put(`/marketplace/${itemId}/status`, { status });

export default api;

