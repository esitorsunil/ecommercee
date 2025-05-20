import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../Redux/WishlistSlice';
import { useAddToCart } from '../Custom Hooks/useaddToCart';

const WishlistPage = () => {
  const handleAddToCart = useAddToCart();
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h4>My Wishlist</h4>
      <div className="row">
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  className="card-img-top p-3"
                  style={{ height: 150, objectFit: 'contain' }}
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="text-secondary" title={product.title}>
                    {product.title.length > 50
                      ? product.title.slice(0, 50) + '...'
                      : product.title}
                  </h6>
                  <p className="fw-bold mb-3">${product.price.toFixed(2)}</p>

                  {/* Buttons row */}
                  <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-secondary flex-grow-1"
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                    >
                      <i className="bi bi-x-circle me-1"></i>Remove
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                      onClick={handleAddToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-1"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
