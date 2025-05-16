import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '../Custom Hooks/useaddToCart';

const ProductCard = ({ product, refProp = null }) => {
  const navigate = useNavigate();
  const handleAddToCart = useAddToCart();

  return (
    <div
      className="col-6 col-md-4 col-lg-3"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.id}`)}
      ref={refProp}
    >
      <div className="card h-100 shadow-sm">
        <img
          src={product.thumbnail || product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-secondary" title={product.title}>
            {product.title.length > 50
              ? product.title.slice(0, 50) + '...'
              : product.title}
          </h6>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <p className="card-text fw-bold mb-0">${product.price.toFixed(2)}</p>
            <p className="text-success small mb-0">Free Delivery</p>
          </div>
          <p className="text-warning mb-2">
            {'★'.repeat(Math.round(product.rating || 0)).padEnd(5, '☆')}
          </p>
          <button
            className="btn btn-outline-primary btn-sm mt-auto w-100"
            onClick={handleAddToCart(product)}
          >
            <i className="bi bi-cart-plus me-1"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
