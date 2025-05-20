import React, { useEffect, useState } from 'react';
import StepHeader from './StepHeader';
import CartDetails from './CartDetails';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Clear specific items from localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('selectedPaymentMethod');
    localStorage.removeItem('selectedShippingAddress');
  
    // Optionally, you could clear the entire localStorage with:
    // localStorage.clear();
      // 2. Clear cart from context (in-memory)
  clearCart();
  
    // Navigate to home page
    navigate('/home');
  };

  const handleEditAddress = () => {
    navigate('/shipping');
  };

  const handleEditPayment = () => {
    navigate('/payment');
  };

  // Load from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedShippingAddress');
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    }

    const savedPayment = localStorage.getItem('selectedPaymentMethod');
    if (savedPayment) {
      setPaymentMethod(savedPayment);
    }
  }, []);

  return (
    <>
      <StepHeader currentStep={4} />
      <div className="container pt-5 bg-light">
        <CartDetails
          totalItems={totalItems}
          totalPrice={totalPrice}
          buttonText="Place Order"
          onButtonClick={handlePlaceOrder}
        />

        <div className="row my-3">
  <div className="col-md-7">
    {/* Delivery Address */}
    <h5 className="mb-3 text-secondary"><i class="bi bi-geo-fill text-primary me-2"></i>Delivery Address</h5>
    {selectedAddress && (
      <div className="card mb-4  bg-light border-1">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-semibold mb-0 ">{selectedAddress.name}</p>
            <button
              className="btn btn-link text-primary fw-bold p-0"
              onClick={handleEditAddress}
              style={{ textDecoration: 'none' }}
            >
              EDIT
            </button>
          </div>
          <p className="mb-1 text-secondary">
            {[selectedAddress.houseNo, selectedAddress.area, selectedAddress.pincode, selectedAddress.city, selectedAddress.state]
              .filter(Boolean)
              .join(', ')}
          </p>
          <p className="mb-0 text-secondary">{selectedAddress.mobile}</p>
        </div>
      </div>
    )}

    {/* Payment Mode */}
    <h5 className="mb-3 text-secondary">Payment Mode</h5>
    {paymentMethod && (
      <div className="card mb-4  bg-light border-1">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 fw-semibold">
           {paymentMethod}
            </p>
            <button
              className="btn btn-link text-primary fw-bold p-0"
              onClick={handleEditPayment}
              style={{ textDecoration: 'none' }}
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

      </div>
    </>
  );
};

export default Confirmation;
