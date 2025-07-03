// src/pages/Home.jsx
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import ProductsForYou from './ProductYou';
import ProductCategories from './ProductCategory';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products, page } = state;
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

  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 10);

const bestSellers = products.slice(-5);

const bestSellerIds = new Set(bestSellers.map(p => p.id));
const latestOnly = latestProducts.filter(p => !bestSellerIds.has(p.id));

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

        <ProductCategories />



         <div className="my-5">
          <img
            src="https://media.powerlook.in/mycustomfolder/bottom_banner.jpg?aio=w-1200"
            alt="Promotional Banner"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
    

        <section className="mb-5 mt-5">
          <h2 className="mb-3">Best Sellers</h2>
          <div className="row g-3">
            {bestSellers.map(
              product =>
                product &&
                product.thumbnail && (
                  <ProductCard
                    key={`best-${product.id}`}
                    product={product}
                  />
                )
            )}
          </div>
        </section>

        <ProductsForYou />
      </div>
    </>
  );
};

export default Home;
