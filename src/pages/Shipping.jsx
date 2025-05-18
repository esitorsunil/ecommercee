import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StepHeader from './steps/StepHeader';

const Shipping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: '',
    city: '',
    houseNo: '',
    street: '',
    state: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.houseNo.trim()) errs.houseNo = 'House number is required';
    if (!form.street.trim()) errs.street = 'Street name is required';
    if (!form.state.trim()) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (index = null) => {
    setEditIndex(index);
    if (index !== null) {
      setForm(addresses[index]);
    } else {
      setForm({ name: '', city: '', houseNo: '', street: '', state: '' });
    }
    setShowModal(true);
  };

  const handleSaveAddress = () => {
    if (!validate()) return;
    const updatedAddresses = [...addresses];
    if (editIndex !== null) {
      updatedAddresses[editIndex] = form;
    } else {
      updatedAddresses.push(form);
    }
    setAddresses(updatedAddresses);
    setShowModal(false);
    setForm({ name: '', city: '', houseNo: '', street: '', state: '' });
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAddress === null) {
      alert('Please select a shipping address');
      return;
    }

    navigate('/payment', {
      state: { totalPrice, address: addresses[selectedAddress] },
    });
  };

  return (
    <>
      <StepHeader currentStep={2} />
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Shipping Address</h3>
              <button className="btn btn-outline-primary" onClick={() => openModal()}>
                Add New Address
              </button>
            </div>

            <div className="accordion" id="addressAccordion">
              {addresses.map((address, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                    >
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="radio"
                          className="form-check-input me-2"
                          name="selectedAddress"
                          checked={selectedAddress === index}
                          onChange={() => setSelectedAddress(index)}
                        />
                        <strong>{address.name} - {address.city}</strong>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#addressAccordion"
                  >
                    <div className="accordion-body">
                      <p><strong>House No:</strong> {address.houseNo}</p>
                      <p><strong>Street:</strong> {address.street}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => openModal(index)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>
              Continue to Payment
            </button>
          </div>

          <div className="col-md-4">
            <div className="border-start rounded p-4">
              <h5 className="mb-4">Price Details</h5>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editIndex !== null ? 'Edit Address' : 'Add New Address'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {['name', 'city', 'houseNo', 'street', 'state'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                      value={form[field]}
                      onChange={handleChange}
                    />
                    {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveAddress}>Save Address</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
