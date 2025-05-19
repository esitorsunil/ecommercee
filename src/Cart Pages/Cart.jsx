import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import StepHeader from './StepHeader';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
   const navigate = useNavigate();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
     <StepHeader currentStep={1} /> 
    <div className="container pt-5">
    

      {cart.items.length === 0 ? (
       <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
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
          <div className="col-md-8">
              <h3 className="mb-4">Your Cart</h3>
            <h5 className="mb-3">Product Details</h5>

            <div className="accordion" id="cartAccordion">
              {cart.items.map((item, index) => (
                <div className="card mb-3" key={item.id}>
                  <div className="card-header d-flex align-items-center" id={`heading${index}`}>
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      className="me-3"
                    />
                    <h6 className="mb-0 flex-grow-1">{item.title}</h6>

                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      Details
                    </button>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#cartAccordion"
                  >
                    <div className="card-body">
                      <p className="mb-2 fw-bold">${item.price.toFixed(2)} per item</p>
                      <div className="d-flex align-items-center gap-3">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          −
                        </button>
                        <span className="fw-semibold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                      <p className="mt-3 mb-0">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-danger mt-3"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          <div className="col-md-4">
            <div className="border-start rounded p-4">
              <h5 className="mb-4">Price Details</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
  className="btn btn-primary w-100 mb-3"
  onClick={() => navigate('/shipping', { state: { totalPrice } })}
>
  Continue
</button>

              <img
                src="https://images.meesho.com/images/marketing/1588578650850.webp"
                alt="Promotional"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
