import React from 'react'
import { useCart } from '../context/CartContext';

const ProducDetails = () => {
    const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div>
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
    </div>
  )
}

export default ProducDetails
