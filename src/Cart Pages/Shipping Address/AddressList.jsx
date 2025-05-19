import React from 'react';

const AddressList = ({
  fields,
  selectedAddressIndex,
  setValue,
  openModal,
  onDelete,
  expandedIndex,
  toggleAccordion,
}) => {
  return (
    <div className="accordion" id="addressAccordion">
      {fields.map((address, index) => (
        <div className="accordion-item" key={address.id}>
          <h2 className="accordion-header" id={`heading-${index}`}>
            <button
              className={`accordion-button ${expandedIndex === index ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={expandedIndex === index}
              aria-controls={`collapse-${index}`}
            >
              <div className="form-check d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  name="selectedAddress"
                  checked={selectedAddressIndex === index}
                  onChange={() => setValue('selectedAddress', index)}
                  onClick={e => e.stopPropagation()} // prevent accordion toggle on radio click
                />
                <strong>
                  {address.name} - {address.city}
                </strong>
              </div>
            </button>
          </h2>
          <div
            id={`collapse-${index}`}
            className={`accordion-collapse collapse ${expandedIndex === index ? 'show' : ''}`}
            aria-labelledby={`heading-${index}`}
            data-bs-parent="#addressAccordion"
          >
            <div className="accordion-body">
              <p><strong>Mobile:</strong> {address.mobile}</p>
              <p><strong>House No:</strong> {address.houseNo}</p>
              <p><strong>Area:</strong> {address.area}</p>
              <p><strong>Pincode:</strong> {address.pincode}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>State:</strong> {address.state}</p>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={e => {
                  e.stopPropagation();
                  openModal(index);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={e => {
                  e.stopPropagation();
                  onDelete(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
