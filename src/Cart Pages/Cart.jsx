import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import StepHeader from './StepHeader';
import CartDetails from './CartDetails';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <div className="">
              <h3 className="mb-4">Your Cart</h3>
              <CartDetails totalItems={totalItems} totalPrice={totalPrice} 
              buttonText="Continue"
              onButtonClick={() => navigate('/shipping', { state: { totalPrice } })}
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
