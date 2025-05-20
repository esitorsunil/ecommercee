// components/SelectedAddress.jsx
import React from 'react';

const SelectedAddress = ({ address }) => {
  if (!address) return null;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          aria-expanded="true"
        >
          <div className="form-check d-flex align-items-center">
            <input
              type="radio"
              className="form-check-input me-2"
              checked
              readOnly
            />
            <strong>{address.name} - {address.city}</strong>
          </div>
        </button>
      </h2>
      <div className="accordion-collapse collapse show">
        <div className="accordion-body">
          <p><strong>Mobile:</strong> {address.mobile}</p>
          <p><strong>House No:</strong> {address.houseNo}</p>
          <p><strong>Area:</strong> {address.area}</p>
          <p><strong>Pincode:</strong> {address.pincode}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedAddress;
