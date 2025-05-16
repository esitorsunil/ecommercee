import { useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

const ProductsForYou = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { visibleProducts, totalProducts, products } = state;
  const observer = useRef();
  const navigate = useNavigate();

  const lastProductRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && products.length < totalProducts) {
          dispatch({ type: 'INCREMENT_PAGE' });
        }
      });

      if (node) observer.current.observe(node);
    },
    [dispatch, products.length, totalProducts]
  );

  return (
    <section className="mb-5">
      <h2 className="mb-3">Products for You</h2>
      <div className="row g-3">
        {visibleProducts.map((product, index) => {
          const isLastProduct = index === visibleProducts.length - 1;
          return (
            <div
              key={product.id}
              className="col-6 col-md-4 col-lg-3"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.id}`)}
              ref={isLastProduct ? lastProductRef : null}
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
                    <p className="card-text fw-bold mb-0">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-success small mb-0">Free Delivery</p>
                  </div>

                  <p className="text-warning mb-2">
                    {'★'.repeat(Math.round(product.rating || 0)).padEnd(5, '☆')}
                  </p>

                  <button className="btn btn-outline-primary btn-sm mt-auto w-100">
                    <i className="bi bi-cart-plus me-1"></i>Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsForYou;
