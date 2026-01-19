import React, { useState, useEffect } from 'react';
import { getAvailabilities, updateAvailabilityStatus } from '../services/api';
import AvailabilityCard from './AvailabilityCard';
import './SeekAvailability.css';

const SeekAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    post_type: 'post_availability',
    housing_property: '',
    community: '',
    gender_preference: '',
    cost_max: '',
    lease_term: '',
    apartment_plan: '',
    number_of_roommates: '',
    course_program: '',
    status: ''
  });

  const housingProperties = ['', 'Beverly Plaza Apartments', 'Park Avenue', 'Patio Gardens', 'Circles Apartments'];
  const communities = ['', 'Students', 'Working Individuals', 'Americans', 'Asians', 'Chinese', 'Other'];
  const genderOptions = ['', 'Any', 'Male', 'Female'];
  const leaseTerms = ['', '6 months', '12 months', '18 months', '24 months'];
  const statusOptions = ['', 'available', 'booking_fast', 'filled_up'];

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    setLoading(true);
    try {
      console.log('Loading availabilities with filters:', filters);
      const response = await getAvailabilities(filters);
      console.log('API Response:', response);
      console.log('Availabilities data:', response.data);
      setAvailabilities(response.data);
    } catch (error) {
      console.error('Error loading availabilities:', error);
      console.error('Error details:', error.response?.data || error.message);
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

  const handleApplyFilters = (e) => {
    e.preventDefault();
    loadAvailabilities();
  };

  const handleClearFilters = () => {
    setFilters({
      post_type: 'post_availability',
      housing_property: '',
      community: '',
      gender_preference: '',
      cost_max: '',
      lease_term: '',
      apartment_plan: '',
      number_of_roommates: '',
      course_program: '',
      status: ''
    });
    setTimeout(loadAvailabilities, 100);
  };

  const handleMarkFilled = async (availabilityId) => {
    try {
      await updateAvailabilityStatus(availabilityId, 'filled_up');
      loadAvailabilities();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="seek-availability-container">
      <div className="page-header">
        <h1>Seek Availability</h1>
        <p>Find your perfect roommate and accommodation</p>
      </div>

      <div className="filters-section">
        <h2>Filters</h2>
        <form onSubmit={handleApplyFilters} className="filters-form">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Housing Property</label>
              <select
                name="housing_property"
                value={filters.housing_property}
                onChange={handleFilterChange}
              >
                <option value="">All Properties</option>
                {housingProperties.filter(p => p).map(prop => (
                  <option key={prop} value={prop}>{prop}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Community (Ethnicity/Background)</label>
              <select
                name="community"
                value={filters.community}
                onChange={handleFilterChange}
              >
                <option value="">All Communities</option>
                {communities.filter(c => c).map(comm => (
                  <option key={comm} value={comm}>{comm}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Gender Preference</label>
              <select
                name="gender_preference"
                value={filters.gender_preference}
                onChange={handleFilterChange}
              >
                {genderOptions.map(opt => (
                  <option key={opt} value={opt}>{opt || 'Any'}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Max Cost ($)</label>
              <input
                type="number"
                name="cost_max"
                value={filters.cost_max}
                onChange={handleFilterChange}
                min="0"
                step="0.01"
                placeholder="No limit"
              />
            </div>

            <div className="filter-group">
              <label>Lease Term</label>
              <select
                name="lease_term"
                value={filters.lease_term}
                onChange={handleFilterChange}
              >
                {leaseTerms.map(term => (
                  <option key={term} value={term}>{term || 'Any'}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Apartment Plan</label>
              <input
                type="text"
                name="apartment_plan"
                value={filters.apartment_plan}
                onChange={handleFilterChange}
                placeholder="e.g., 2B2B"
              />
            </div>

            <div className="filter-group">
              <label>Number of Roommates</label>
              <input
                type="number"
                name="number_of_roommates"
                value={filters.number_of_roommates}
                onChange={handleFilterChange}
                min="1"
                placeholder="Any"
              />
            </div>

            <div className="filter-group">
              <label>Course/Program</label>
              <input
                type="text"
                name="course_program"
                value={filters.course_program}
                onChange={handleFilterChange}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt || 'All'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button type="submit" className="apply-button">Apply Filters</button>
            <button type="button" onClick={handleClearFilters} className="clear-button">Clear Filters</button>
          </div>
        </form>
      </div>

      <div className="results-section">
        <h2>Available Listings ({availabilities.length})</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : availabilities.length === 0 ? (
          <div className="no-results">No availabilities found matching your filters.</div>
        ) : (
          <div className="availability-grid">
            {availabilities.map(avail => {
              const currentUserId = parseInt(localStorage.getItem('roomsync_user_id') || '0');
              const isAuthor = avail.user_id === currentUserId;
              return (
                <AvailabilityCard
                  key={avail.id}
                  availability={avail}
                  onMarkFilled={handleMarkFilled}
                  isAuthor={isAuthor}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekAvailability;

