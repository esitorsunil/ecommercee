
import { useContext, useState } from 'react';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { searchQuery, searchResults } = state;
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });

    if (query.trim().length === 0) {
      dispatch({ type: 'CLEAR_SEARCH' });
      return;
    }

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: data.products });
      setShowDropdown(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSelect = (productId) => {
    setShowDropdown(false);
    dispatch({ type: 'CLEAR_SEARCH' });
    navigate(`/product/${productId}`);
  };

  return (
    <div className="position-relative w-100">
      <input
        type="text"
        className="form-control form-control-lg rounded-0 border-primary"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchQuery && setShowDropdown(true)}
      />
      {showDropdown && searchResults.length > 0 && (
        <div className="position-absolute top-100 start-0 w-100 bg-white shadow-lg z-3 max-height-scroll">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="d-flex align-items-center px-3 py-2 border-bottom search-result-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(product.id)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="me-2"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
