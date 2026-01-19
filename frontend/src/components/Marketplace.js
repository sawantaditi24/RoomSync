import React, { useState, useEffect } from 'react';
import { createUser, createMarketplaceItem, getMarketplaceItems } from '../services/api';
import MarketplaceCard from './MarketplaceCard';
import './Marketplace.css';

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    price_max: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    title: '',
    description: '',
    category: '',
    price: '',
    condition: '',
    image_url: ''
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['lamp', 'chair', 'study_table', 'bed', 'desk', 'other'];
  const conditions = ['new', 'like_new', 'good', 'fair'];

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await getMarketplaceItems(filters);
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    loadItems();
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      price_max: ''
    });
    setTimeout(loadItems, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let user;
      if (!userId) {
        const userResponse = await createUser({
          name: formData.name,
          email: formData.email,
          contact: formData.contact
        });
        user = userResponse.data;
        setUserId(user.id);
      } else {
        user = { id: userId };
      }

      await createMarketplaceItem({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        condition: formData.condition,
        image_url: formData.image_url
      });

      setSubmitted(true);
      setShowPostForm(false);
      loadItems();
      
      // Reset form
      setTimeout(() => {
        setFormData({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          title: '',
          description: '',
          category: '',
          price: '',
          condition: '',
          image_url: ''
        });
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post item. Please try again.');
    }
  };

  return (
    <div className="marketplace-container">
      <div className="page-header">
        <h1>Marketplace</h1>
        <p>Buy and sell essential student items</p>
        <button className="post-item-button" onClick={() => setShowPostForm(!showPostForm)}>
          {showPostForm ? 'Cancel' : 'Post an Item'}
        </button>
      </div>

      {showPostForm && (
        <div className="post-form-section">
          <h2>Post an Item for Sale</h2>
          {error && <div className="error-message">{error}</div>}
          {submitted && <div className="success-message">Item posted successfully!</div>}
          <form onSubmit={handleSubmit} className="marketplace-form">
            <div className="form-section">
              <h3>Your Contact Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact *</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Item Details</h3>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond.replace('_', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleFormChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <button type="submit" className="submit-button">Post Item</button>
          </form>
        </div>
      )}

      <div className="filters-section">
        <h2>Filters</h2>
        <form onSubmit={handleApplyFilters} className="filters-form">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Max Price ($)</label>
              <input
                type="number"
                name="price_max"
                value={filters.price_max}
                onChange={handleFilterChange}
                min="0"
                step="0.01"
                placeholder="No limit"
              />
            </div>
          </div>
          <div className="filter-actions">
            <button type="submit" className="apply-button">Apply Filters</button>
            <button type="button" onClick={handleClearFilters} className="clear-button">Clear Filters</button>
          </div>
        </form>
      </div>

      <div className="results-section">
        <h2>Available Items ({items.length})</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="no-results">No items found matching your filters.</div>
        ) : (
          <div className="marketplace-grid">
            {items.map(item => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

