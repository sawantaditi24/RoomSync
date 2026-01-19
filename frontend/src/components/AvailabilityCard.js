import React, { useState } from 'react';
import './AvailabilityCard.css';

const AvailabilityCard = ({ availability, onMarkFilled, isAuthor = false }) => {
  const [showContact, setShowContact] = useState(false);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'booking_fast':
        return 'status-booking-fast';
      case 'filled_up':
        return 'status-filled';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'booking_fast':
        return 'Booking Fast';
      case 'filled_up':
        return 'Filled Up';
      default:
        return status;
    }
  };

  return (
    <div className={`availability-card ${getStatusBadgeClass(availability.status)}`}>
      <div className="card-header">
        <div className="status-badge">{getStatusLabel(availability.status)}</div>
        <div className="community-name">{availability.housing_property}</div>
      </div>

      <div className="card-body">
        <div className="card-detail">
          <span className="detail-label">Apartment Plan:</span>
          <span className="detail-value">{availability.apartment_plan}</span>
        </div>
        <div className="card-detail">
          <span className="detail-label">Roommates Preferred:</span>
          <span className="detail-value">{availability.number_of_roommates_preferred}</span>
        </div>
        <div className="card-detail">
          <span className="detail-label">Gender Preference:</span>
          <span className="detail-value">{availability.gender_preference}</span>
        </div>
        <div className="card-detail">
          <span className="detail-label">Cost Range:</span>
          <span className="detail-value">
            ${availability.cost_preference_min} - ${availability.cost_preference_max}
          </span>
        </div>
        <div className="card-detail">
          <span className="detail-label">Lease Term:</span>
          <span className="detail-value">{availability.lease_term}</span>
        </div>
        {availability.dietary_restrictions && (
          <div className="card-detail">
            <span className="detail-label">Dietary Restrictions:</span>
            <span className="detail-value">{availability.dietary_restrictions}</span>
          </div>
        )}
        {availability.course_program && (
          <div className="card-detail">
            <span className="detail-label">Course/Program:</span>
            <span className="detail-value">{availability.course_program}</span>
          </div>
        )}
        {availability.community && (
          <div className="card-detail">
            <span className="detail-label">Community (Ethnicity/Background):</span>
            <span className="detail-value">{availability.community}</span>
          </div>
        )}
        {availability.miscellaneous && (
          <div className="card-detail">
            <span className="detail-label">Additional Info:</span>
            <span className="detail-value">{availability.miscellaneous}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        {!showContact ? (
          <button
            className="contact-button"
            onClick={() => setShowContact(true)}
          >
            Show Contact Details
          </button>
        ) : (
          <div className="contact-details">
            <div className="contact-info">
              <strong>Name:</strong> {availability.user.name}
            </div>
            <div className="contact-info">
              <strong>Email:</strong> {availability.user.email}
            </div>
            <div className="contact-info">
              <strong>Contact:</strong> {availability.user.contact}
            </div>
            {isAuthor && availability.status !== 'filled_up' && (
              <button
                className="mark-filled-button"
                onClick={() => onMarkFilled(availability.id)}
              >
                Mark as Filled
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCard;

