import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepHeader from './StepHeader';
import { usePaymentContext } from '../context/PaymentContext';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const { state: paymentState, dispatch } = usePaymentContext();
  const [selectedMethod, setSelectedMethod] = useState(paymentState.paymentMethod || '');

  const paymentOptions = [
    { id: 'Cash on Delivery', label: 'Cash on Delivery', description: 'Pay in cash when the product is delivered to your doorstep.' },
    { id: 'UPI Payment', label: 'UPI Payment', description: 'You’ll be prompted to enter your UPI ID at the time of confirmation.' },
    { id: 'Card Payment', label: 'Card Payment', description: 'Securely enter your card details at checkout.' },
  ];

  useEffect(() => {
    setSelectedMethod(paymentState.paymentMethod || '');
  }, [paymentState.paymentMethod]);

  const handleSelect = (id) => {
    setSelectedMethod(id);
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: id });
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    navigate('/confirmation', {
      state: {
        totalPrice,
        paymentMethod: selectedMethod,
      },
    });
  };

  return (
    <>
      <StepHeader currentStep={3} />
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-8">
            <h3 className="mb-4">Choose Payment Method</h3>
            <div className="row g-3">
              {paymentOptions.map((option) => (
                <div className="col-12" key={option.id}>
                  <div
                    className={`card p-3 shadow-sm border ${
                      selectedMethod === option.id ? 'border-primary' : ''
                    }`}
                    onClick={() => handleSelect(option.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="form-check d-flex align-items-start">
                      <input
                        type="radio"
                        className="form-check-input me-3 mt-1"
                        name="paymentMethod"
                        checked={selectedMethod === option.id}
                        onChange={() => handleSelect(option.id)}
                      />
                      <div>
                        <h5 className="mb-1">{option.label}</h5>
                        <p className="mb-0 text-muted">{option.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary mt-4" onClick={handleContinue}>
              Continue to Confirmation
            </button>
          </div>

          <div className="col-md-4">
            <div className="border-start rounded p-4 shadow-sm bg-light">
              <h5 className="mb-4">Price Details</h5>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
