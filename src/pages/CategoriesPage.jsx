import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-capitalize">{categoryName} Products</h3>

      <div className="row g-3">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
