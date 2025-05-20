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
      <div className="container pt-5">
        <CartDetails
          totalItems={totalItems}
          totalPrice={totalPrice}
          buttonText="Place Order"
          onButtonClick={handlePlaceOrder}
        />

        <div className="row my-3">
  <div className="col-md-7">
    <h5 className="mb-3 text-secondary">Delivery Address</h5>
    {selectedAddress && (
      <div className="card mb-4 shadow-sm border-0"> {/* Remove card border */}
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold mb-0">{selectedAddress.name}</p>
            <button 
              className="btn btn-link text-primary p-0 fw-bold" 
              onClick={handleEditAddress}
              style={{ textDecoration: 'none' }} // Remove underline if you want
            >
              EDIT
            </button>
          </div>

          <p>
            {[selectedAddress.houseNo, selectedAddress.area, selectedAddress.pincode, selectedAddress.city, selectedAddress.state]
              .filter(Boolean)
              .join(', ')}
          </p>
          <p>{selectedAddress.mobile}</p>
        </div>
      </div>
    )}

    <h5 className="mb-3 text-secondary">Payment Mode</h5>
    {paymentMethod && (
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <strong>Selected Method:</strong> {paymentMethod}
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
