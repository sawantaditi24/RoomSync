import React, { useState } from 'react';
import { createUser, getUser, createAvailability } from '../services/api';
import './PostAvailability.css';

const PostAvailability = () => {
  const [formData, setFormData] = useState({
    // User info
    name: '',
    email: '',
    contact: '',
    
    // Availability info
    post_type: 'post_availability',
    housing_property: '',
    apartment_plan: '',
    number_of_roommates_preferred: '',
    gender_preference: 'Any',
    cost_preference_min: '',
    cost_preference_max: '',
    lease_term: '',
    dietary_restrictions: '',
    course_program: '',
    community: '',
    miscellaneous: '',
    status: 'available'
  });

  const [userId, setUserId] = useState(() => {
    // Get user_id from localStorage if exists
    const stored = localStorage.getItem('roomsync_user_id');
    return stored ? parseInt(stored) : null;
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const housingProperties = ['Beverly Plaza Apartments', 'Park Avenue', 'Patio Gardens', 'Circles Apartments'];
  const communities = ['Students', 'Working Individuals', 'Americans', 'Asians', 'Chinese', 'Other'];
  const genderOptions = ['Any', 'Male', 'Female'];
  const leaseTerms = ['6 months', '12 months', '18 months', '24 months'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // First create or get user
      let user;
      if (!userId) {
        console.log('Creating new user...', { name: formData.name, email: formData.email, contact: formData.contact });
        const userResponse = await createUser({
          name: formData.name,
          email: formData.email,
          contact: formData.contact
        });
        console.log('User created:', userResponse.data);
        user = userResponse.data;
        if (!user || !user.id) {
          throw new Error('Failed to create user. User ID not returned.');
        }
        setUserId(user.id);
        // Store user_id in localStorage
        localStorage.setItem('roomsync_user_id', user.id.toString());
      } else {
        // Verify user exists by trying to fetch them
        try {
          console.log('Verifying existing user ID:', userId);
          const userResponse = await getUser(userId);
          user = userResponse.data;
          console.log('User verified:', user);
        } catch (err) {
          // User doesn't exist, create a new one
          console.log('User not found, creating new user...');
          localStorage.removeItem('roomsync_user_id'); // Clear invalid user ID
          setUserId(null);
          const userResponse = await createUser({
            name: formData.name,
            email: formData.email,
            contact: formData.contact
          });
          user = userResponse.data;
          if (!user || !user.id) {
            throw new Error('Failed to create user. User ID not returned.');
          }
          setUserId(user.id);
          localStorage.setItem('roomsync_user_id', user.id.toString());
        }
      }
      
      console.log('Creating availability with user_id:', user.id);

      // Create availability post
      await createAvailability({
        user_id: user.id,
        post_type: formData.post_type,
        housing_property: formData.housing_property,
        apartment_plan: formData.apartment_plan,
        number_of_roommates_preferred: parseInt(formData.number_of_roommates_preferred),
        gender_preference: formData.gender_preference,
        cost_preference_min: parseFloat(formData.cost_preference_min),
        cost_preference_max: parseFloat(formData.cost_preference_max),
        lease_term: formData.lease_term,
        dietary_restrictions: formData.dietary_restrictions,
        course_program: formData.course_program,
        community: formData.community,
        miscellaneous: formData.miscellaneous,
        status: formData.status
      });

      setSubmitted(true);
      // Reset form
      setFormData({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        post_type: 'post_availability',
        housing_property: '',
        apartment_plan: '',
        number_of_roommates_preferred: '',
        gender_preference: 'Any',
        cost_preference_min: '',
        cost_preference_max: '',
        lease_term: '',
        dietary_restrictions: '',
        course_program: '',
        community: '',
        miscellaneous: '',
        status: 'available'
      });
    } catch (err) {
      console.error('Error posting availability:', err);
      console.error('Error response:', err.response?.data);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to post availability. Please try again.';
      setError(errorMessage);
    }
  };

  if (submitted) {
    return (
      <div className="post-availability-container">
        <div className="success-message">
          <h2>Success!</h2>
          <p>Your availability has been posted successfully.</p>
          <button onClick={() => setSubmitted(false)}>Post Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-availability-container">
      <div className="form-wrapper">
        <h1>Post Availability</h1>
        <p className="subtitle">I live here and I'm looking for a roommate</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="availability-form">
          <div className="form-section">
            <h2>Your Contact Information</h2>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number *</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Property Details</h2>
            <div className="form-group">
              <label>Housing Property *</label>
              <select
                name="housing_property"
                value={formData.housing_property}
                onChange={handleChange}
                required
              >
                <option value="">Select Housing Property</option>
                {housingProperties.map(prop => (
                  <option key={prop} value={prop}>{prop}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Apartment Plan *</label>
              <input
                type="text"
                name="apartment_plan"
                value={formData.apartment_plan}
                onChange={handleChange}
                placeholder="e.g., 2B2B, 3B2B"
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Roommates Preferred *</label>
              <input
                type="number"
                name="number_of_roommates_preferred"
                value={formData.number_of_roommates_preferred}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Preferences</h2>
            <div className="form-group">
              <label>Gender Preference *</label>
              <select
                name="gender_preference"
                value={formData.gender_preference}
                onChange={handleChange}
                required
              >
                {genderOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Cost Preference - Min ($) *</label>
                <input
                  type="number"
                  name="cost_preference_min"
                  value={formData.cost_preference_min}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Cost Preference - Max ($) *</label>
                <input
                  type="number"
                  name="cost_preference_max"
                  value={formData.cost_preference_max}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Lease Term *</label>
              <select
                name="lease_term"
                value={formData.lease_term}
                onChange={handleChange}
                required
              >
                <option value="">Select Lease Term</option>
                {leaseTerms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Dietary Restrictions</label>
              <input
                type="text"
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleChange}
                placeholder="e.g., Vegetarian, Vegan, No restrictions"
              />
            </div>
            <div className="form-group">
              <label>Course/Program</label>
              <input
                type="text"
                name="course_program"
                value={formData.course_program}
                onChange={handleChange}
                placeholder="e.g., Computer Science, MBA"
              />
            </div>
            <div className="form-group">
              <label>Community (Ethnicity/Background)</label>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
              >
                <option value="">Select Community</option>
                {communities.map(comm => (
                  <option key={comm} value={comm}>{comm}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Miscellaneous</label>
              <textarea
                name="miscellaneous"
                value={formData.miscellaneous}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional information..."
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="booking_fast">Booking Fast</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">Post Availability</button>
        </form>
      </div>
    </div>
  );
};

export default PostAvailability;

