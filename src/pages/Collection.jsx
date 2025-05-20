import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import {
  fetchProducts,
  toggleCategory,
  toggleBrand,
  setPriceRange,
  setRating,
  setSortBy,
  setCategorySearch,
  applyFilters
} from '../Redux/productSlice';

const Collection = () => {
  const dispatch = useDispatch();

  const {
    filtered,
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    priceRange,
    rating,
    sortBy,
    categorySearch,
    status,
    error
  } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, selectedCategories, selectedBrands, priceRange, rating, sortBy]);

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const handlePriceChange = (e, index) => {
    const value = Number(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;
    dispatch(setPriceRange(newRange));
  };

  return (
    <div className="p-5 d-flex">
      <aside style={{ width: '300px', marginRight: '5rem' }}>
        <h3>Products For You</h3>

        <div className="mb-4 mt-3">
          <h5>Sort By</h5>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="discount-desc">Discount: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="mb-4">
          <h5>Category</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search categories..."
            value={categorySearch}
            onChange={(e) => dispatch(setCategorySearch(e.target.value))}
          />
          {categories
            .filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()))
            .map(category => (
              <div key={category} className="form-check">
                <input
                  type="checkbox"
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleToggleCategory(category)}
                  className="form-check-input"
                />
                <label htmlFor={`cat-${category}`} className="form-check-label">
                  {category}
                </label>
              </div>
            ))}
        </div>

        <div className="mb-4">
          <h5>Brand</h5>
          {brands.map(brand => (
            <div key={brand} className="form-check">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleToggleBrand(brand)}
                className="form-check-input"
              />
              <label htmlFor={`brand-${brand}`} className="form-check-label">
                {brand}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h5>Price Range</h5>
          <div className="d-flex align-items-center">
            <input
              type="number"
              value={priceRange[0]}
              min="0"
              max={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="form-control me-2"
              style={{ width: '100px' }}
            />
            <span>to</span>
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max="1000"
              onChange={(e) => handlePriceChange(e, 1)}
              className="form-control ms-2"
              style={{ width: '100px' }}
            />
          </div>
        </div>

        <div className="mb-4">
          <h5>Minimum Rating</h5>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => dispatch(setRating(Number(e.target.value)))}
          >
            <option value={0}>All Ratings</option>
            <option value={1}>1 and above</option>
            <option value={2}>2 and above</option>
            <option value={3}>3 and above</option>
            <option value={4}>4 and above</option>
            <option value={5}>5 only</option>
          </select>
        </div>
      </aside>

      <main style={{ flex: 1 }}>
        <div className="row g-3">
          {status === 'loading' && <p>Loading products...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && filtered.length === 0 && (
            <p>No products found matching your criteria.</p>
          )}
          {status === 'succeeded' && filtered.length > 0 && (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
