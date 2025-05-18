import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepHeader from './steps/StepHeader';

const Confirmation = () => {
  const navigate = useNavigate();

  const products = JSON.parse(localStorage.getItem('cart')) || [];
  const address = JSON.parse(localStorage.getItem('selectedAddress')) || {};
  const paymentMethod = localStorage.getItem('paymentMethod') || '';
  const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

  const handlePlaceOrder = () => {
    alert('Order Placed Successfully!');
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <StepHeader currentStep={4} />
      <div className="container pt-5">
        <div className="row">
          {/* Left section */}
          <div className="col-md-8">

            {/* Products */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Products</h4>
                <button className="btn btn-link" onClick={() => navigate('/')}>Edit</button>
              </div>
              {products.length === 0 ? (
                <p>No products selected.</p>
              ) : (
                <ul className="list-group">
                  {products.map((product, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <strong>{product.title}</strong> (x{product.quantity || 1})
                      </span>
                      <span>${(product.price * (product.quantity || 1)).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Delivery Address</h4>
                <button className="btn btn-link" onClick={() => navigate('/shipping')}>Edit</button>
              </div>
              <p><strong>Name:</strong> {address.name}</p>
              <p><strong>House No:</strong> {address.houseNo}</p>
              <p><strong>Street:</strong> {address.street}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>State:</strong> {address.state}</p>
            </div>

            {/* Payment */}
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h4>Payment Method</h4>
                <button className="btn btn-link" onClick={() => navigate('/payment')}>Edit</button>
              </div>
              <p><strong>Method:</strong> {paymentMethod}</p>
            </div>

          </div>

          {/* Right section */}
          <div className="col-md-4">
            <div className="border-start rounded p-4">
              <h5 className="mb-4">Price Details</h5>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn btn-success w-100 mt-3" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
