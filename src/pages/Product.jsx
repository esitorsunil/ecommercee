import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import ProductsForYou from './ProductYou';
import { useAddToCart } from '../Custom Hooks/useaddToCart';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ProductContext);
  const { selectedProduct } = state;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        dispatch({ type: 'SET_SELECTED_PRODUCT', payload: data });
      } catch (error) {
        console.error(error);
        alert('Failed to fetch product details.');
        navigate('/');
      }
    };
    fetchProduct();

    return () => {
      dispatch({ type: 'CLEAR_SELECTED_PRODUCT' });
    };
  }, [id, navigate, dispatch]);

  if (!selectedProduct) return <div className="container py-5">Loading product...</div>;

  const product = selectedProduct;

  const handleAddToCart = useAddToCart();

  return (
    <div className="container py-5">
      <button
        className="btn btn-link mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="img-fluid rounded shadow-sm mb-5 "
            style={{ objectFit: 'contain', maxHeight: '400px', width: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.brand}</p>
          <p>{product.description}</p>
          <h4 className="text-primary">${product.price.toFixed(2)}</h4>
          <p className="text-warning fs-5">
            {'★'.repeat(Math.round(product.rating))}{' '}
            <span className="text-muted">({product.rating})</span>
          </p>
          <p>Stock: {product.stock}</p>

           <button
            className="btn btn-outline-primary btn-sm mt-auto w-100"
            onClick={handleAddToCart(product)}
          >
            <i className="bi bi-cart-plus me-1"></i>Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-5">
        <ProductsForYou />
      </div>
    </div>
  );
};

export default Product;
