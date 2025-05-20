
import { useCart } from "../context/CartContext";

const CartDetails = ({ totalItems, totalPrice, buttonText, onButtonClick }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="row">
      {/* Left Column: Product Details */}
      <div className="col-md-7">
        <h5 className="mb-3 text-secondary">Product Details</h5>
        <div className="accordion bg-white" id="cartAccordion">
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
  className="btn btn-link text-primary text-decoration-none fw-bold fs-6 p-0"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target={`#collapse${index}`}
  aria-expanded="false"
  aria-controls={`collapse${index}`}
>
  EDIT
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
      </div>

      {/* Right Column: Price Summary */}
      <div className="col-md-5">
        <div className="border-start rounded p-4 mt-3 mt-md-0">
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
            onClick={onButtonClick}
          >
            {buttonText}
          </button>

                <img
                  src="https://images.meesho.com/images/marketing/1588578650850.webp"
                  alt="Promotional"
                  className="img-fluid rounded"
                />
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
