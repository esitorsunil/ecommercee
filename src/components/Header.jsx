import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const { state, dispatch } = useSearch();
  const { products, query, showDropdown } = state;

  const { cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom shadow-sm py-3">
        <div className="container">
          <NavLink className="navbar-brand fw-bold text-black" to="/">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="Logo"
              className="me-2"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {['/', '/collection', '/about', '/contact'].map((path, i) => {
                const labels = ['Home', 'Collection', 'About', 'Contact'];
                return (
                  <li className="nav-item" key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `nav-link px-3 ${isActive ? 'border-bottom border-2 border-dark ' : ''}`
                      }
                    >
                      {labels[i]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="position-relative" style={{ width: '300px' }}>
              <i
                className="bi bi-search position-absolute text-muted"
                style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
              ></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search products..."
                value={query}
                onChange={(e) => {
                  dispatch({ type: 'SET_QUERY', payload: e.target.value });
                  dispatch({ type: 'SET_SHOW_DROPDOWN', payload: true });
                }}
                onFocus={() => dispatch({ type: 'SET_SHOW_DROPDOWN', payload: true })}
                onBlur={() => setTimeout(() => dispatch({ type: 'SET_SHOW_DROPDOWN', payload: false }), 200)}
              />
              {showDropdown && query && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm mt-1"
                  style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}
                >
                  {filtered.length ? (
                    filtered.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          dispatch({ type: 'RESET_QUERY' });
                          navigate(`/product/${item.id}`);
                        }}
                      >
                        {item.title}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No results found</li>
                  )}
                </ul>
              )}
            </div>

            <div className="dropdown">
              <button
                className="btn btn-link text-black p-0 dropdown-toggle"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person fs-3"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>

            <button
              className="btn btn-link text-black p-0 position-relative"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/cart');
                } else {
                  const modal = new bootstrap.Modal(document.getElementById('loginPromptModal'));
                  modal.show();
                }
              }}
            >
              <i className="bi bi-cart fs-4"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  const modalEl = document.getElementById('logoutModal');
                  const modal = bootstrap.Modal.getInstance(modalEl);
                  modal.hide();
                  handleLogout();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      <div
        className="modal fade"
        id="loginPromptModal"
        tabIndex="-1"
        aria-labelledby="loginPromptModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginPromptModalLabel">Login Required</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Please log in to view your cart.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const modalEl = document.getElementById('loginPromptModal');
                  const modal = bootstrap.Modal.getInstance(modalEl);
                  modal.hide();
                  navigate('/login');
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Success Toast */}
      <div
        className="position-fixed top-0 start-50 translate-middle-x p-3"
        style={{ zIndex: 1080 }}
      >
        <div
          id="loginToast"
          className="toast text-bg-success align-items-center border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="3000"
        >
          <div className="d-flex">
            <div className="toast-body">Login successful!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
