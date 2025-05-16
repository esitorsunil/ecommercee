import { useRef, useCallback, useContext } from 'react';
import ProductContext from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const ProductsForYou = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { visibleProducts, totalProducts, products } = state;
  const observer = useRef();

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
          const isLast = index === visibleProducts.length - 1;
          return (
            <ProductCard
              key={product.id}
              product={product}
              refProp={isLast ? lastProductRef : null}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductsForYou;
