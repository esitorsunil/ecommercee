import { useEffect, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

const Home = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products, visibleProducts, page, totalProducts } = state;

  const observer = useRef();
  const navigate = useNavigate();
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = page * productsPerPage;
        const res = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
        );
        const data = await res.json();
        dispatch({
          type: 'ADD_PRODUCTS',
          payload: { products: data.products, total: data.total },
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [page, dispatch]);

  const lastProductRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && products.length < totalProducts) {
          dispatch({ type: 'INCREMENT_PAGE' });
        }
      });

      if (node) observer.current.observe(node);
    },
    [dispatch, products.length, totalProducts]
  );

  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 10);

  const bestSellers = [...products]
    .sort((a, b) => b.rating?.rate - a.rating?.rate)
    .slice(0, 5);


  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          overflow: 'hidden',
          height: '500px',
        }}
      >
        <img
          src="https://images.meesho.com/images/marketing/1746425994914.webp"
          alt="Top Banner"
          style={{
            width: '100vw',
            height: '500px',
            objectFit: 'cover',
            display: 'block',
            marginLeft: 'calc(-50vw + 50%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '70%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textShadow: '0 0 10px rgba(0,0,0,0.7)',
          }}
        >
          <h1 className="fw-bold">Smart Shopping</h1>
          <h1 className="fw-bold mb-4">Trusted by Billion</h1>
          <button
            onClick={() => navigate('/collection')}
            className="btn btn-primary btn-lg"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="container py-3">
        <div className="container-fluid bg-light py-2 shadow-sm mb-5">
          <div className="row text-center">
            <div className="col-md-4 mb-2 mb-md-0">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-arrow-counterclockwise fs-3 text-primary me-2"></i>
                <p className="mb-0 fw-semibold">7 Days Easy Return</p>
              </div>
            </div>
            <div className="col-md-4 mb-2 mb-md-0">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-cash-coin fs-3 text-primary me-2"></i>
                <p className="mb-0 fw-semibold">Cash on Delivery</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-tags fs-3 text-primary me-2"></i>
                <p className="mb-0 fw-semibold">Lowest Price</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-5">
          <h2 className="mb-3">Latest Collection</h2>
          <div className="row g-3">
            {latestProducts.map(product => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
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
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="mb-3">Best Sellers</h2>
          <div className="row g-3">
            {bestSellers.map(product => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
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
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="mb-3">Products for You</h2>
          <div className="row g-3">
            {visibleProducts.map((product, index) => {
              const isLastProduct = index === visibleProducts.length - 1;
              return (
                <div
                  key={product.id}
                  className="col-6 col-md-4 col-lg-3"
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
      </div>
    </>
  );
};

export default Home;
