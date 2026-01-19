import React, { useState } from 'react';
import './MarketplaceCard.css';

const MarketplaceCard = ({ item }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="marketplace-card">
      {item.image_url && (
        <div className="card-image">
          <img src={item.image_url} alt={item.title} />
        </div>
      )}
      <div className="card-body">
        <div className="card-header">
          <h3 className="item-title">{item.title}</h3>
          <div className="item-price">${item.price}</div>
        </div>
        <div className="item-category">{item.category.replace('_', ' ').toUpperCase()}</div>
        {item.condition && (
          <div className="item-condition">Condition: {item.condition.replace('_', ' ').toUpperCase()}</div>
        )}
        {item.description && (
          <p className="item-description">{item.description}</p>
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
              <strong>Name:</strong> {item.user.name}
            </div>
            <div className="contact-info">
              <strong>Contact:</strong> {item.user.contact}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceCard;

