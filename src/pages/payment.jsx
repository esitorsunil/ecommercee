import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepHeader from '../Cart Pages/StepHeader';
import { usePaymentContext } from '../context/PaymentContext';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const { state: paymentState, dispatch } = usePaymentContext();
  const [selectedMethod, setSelectedMethod] = useState(paymentState.paymentMethod || '');

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery' },
    { id: 'upi', label: 'UPI Payment' },
    { id: 'card', label: 'Card Payment' },
  ];

  // Sync local selected method state with context state (in case context updates elsewhere)
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
          {/* Left: Payment Options */}
          <div className="col-md-8">
            <h3 className="mb-4">Choose Payment Method</h3>
            <div className="accordion" id="paymentAccordion">
              {paymentOptions.map((option) => (
                <div className="accordion-item" key={option.id}>
                  <h2 className="accordion-header" id={`heading-${option.id}`}>
                    <button
                      className={`accordion-button ${selectedMethod !== option.id ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${option.id}`}
                      aria-expanded={selectedMethod === option.id}
                      aria-controls={`collapse-${option.id}`}
                      onClick={() => handleSelect(option.id)}
                    >
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="radio"
                          className="form-check-input me-2"
                          name="paymentMethod"
                          checked={selectedMethod === option.id}
                          readOnly
                        />
                        <strong>{option.label}</strong>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${option.id}`}
                    className={`accordion-collapse collapse ${selectedMethod === option.id ? 'show' : ''}`}
                    aria-labelledby={`heading-${option.id}`}
                    data-bs-parent="#paymentAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        {option.id === 'cod' && 'You will pay when the product is delivered to your doorstep.'}
                        {option.id === 'upi' && 'Enter your UPI ID at the time of payment confirmation.'}
                        {option.id === 'card' && 'Provide card details securely at checkout.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary mt-4" onClick={handleContinue}>
              Continue to Confirmation
            </button>
          </div>

          {/* Right: Price Details */}
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
    </>
  );
};

export default Payment;
