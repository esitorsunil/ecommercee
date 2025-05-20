import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import StepHeader from './StepHeader';
import CartDetails from './CartDetails';
import { useState } from 'react';

const Cart = () => {
  const { cart, clearCart, toggleGiftPack, setGiftMessage } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGiftMessageChange = (e) => {
    setGiftMessage(e.target.value);
  };

  return (
    <>
      <StepHeader currentStep={1} />
      <div className="container pt-5">
        {cart.items.length === 0 ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: '400px' }}
          >
            <img
              src="https://cdn.evenrun.com/menta/Yellow-boxes.png"
              alt="cart-empty"
              height={300}
              className="mb-3"
            />
            <h5>Your cart is empty</h5>
            <p className="text-muted text-center px-3">
              Just relax, let us help you find some first-class products.
            </p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <h3 className="mb-4">Your Cart</h3>
  {/* Gift Pack Toggle */}
              < div className="row">
      {/* Left Column: Product Details */}
      <div className="col-md-7">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="giftToggle"
                  checked={cart.isGift}
                  onChange={toggleGiftPack}
                />
                <label className="form-check-label" htmlFor="giftToggle">
                  Send as a Gift
                </label>
              </div>

              {/* Gift Message Input */}
              {cart.isGift && (
                <div className="mb-4">
                  <label htmlFor="giftMessage" className="form-label">
                    Gift Message (optional)
                  </label>
                  <textarea
                    id="giftMessage"
                    className="form-control"
                    rows="3"
                    value={cart.giftMessage}
                    onChange={handleGiftMessageChange}
                    placeholder="Write a message to accompany your gift"
                  />
                </div>
              )}
             
</div>
          </div>
              <CartDetails
                totalItems={totalItems}
                totalPrice={totalPrice}
                buttonText="Continue"
                onButtonClick={() => navigate('/shipping', { state: { totalPrice, isGift: cart.isGift, giftMessage: cart.giftMessage } })}
              />

             

              <button className="btn btn-danger mt-3" onClick={clearCart}>
                Clear Cart
              </button>
            
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
