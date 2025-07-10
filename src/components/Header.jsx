import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice'; // import your logout action
import { resetEditMode } from '../Redux/editmodeSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);
  const isAuthenticated = !!authToken;
  const wishlist = useSelector((state) => state.wishlist);

  const { state, dispatch: searchDispatch } = useSearch();
  const { products, query, showDropdown } = state;
  const { cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
 dispatch(logout());
dispatch(resetEditMode()); // 👈 this line;

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
              src="https://www.powerlook.in/images/Logo/pl-logo.png?aio=w-200"
              alt="Logo"
              className="me-2"
            />
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
                        `nav-link px-3 ${isActive ? 'border-bottom border-2 border-dark' : ''}`
                      }
                    >
                      {labels[i]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className="position-relative me-5"
            onClick={() => navigate('/wishlist')}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-bookmark-heart fs-5"></i>
            {wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlist.length}
              </span>
            )}
          </div>

          <div className="d-flex align-items-center gap-4">
            {/* 🔍 Search */}
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
                  searchDispatch({ type: 'SET_QUERY', payload: e.target.value });
                  searchDispatch({ type: 'SET_SHOW_DROPDOWN', payload: true });
                }}
                onFocus={() => searchDispatch({ type: 'SET_SHOW_DROPDOWN', payload: true })}
                onBlur={() => setTimeout(() => searchDispatch({ type: 'SET_SHOW_DROPDOWN', payload: false }), 200)}
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
                          searchDispatch({ type: 'RESET_QUERY' });
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

            {/* 👤 Profile Dropdown */}
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
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li>
                      <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutModal">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                )}
              </ul>
            </div>

            {/* 🛒 Cart */}
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

      {/* 🔒 Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  bootstrap.Modal.getInstance(document.getElementById('logoutModal')).hide();
                  handleLogout();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 Login Prompt Modal */}
      <div className="modal fade" id="loginPromptModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login Required</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Please log in to view your cart.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  bootstrap.Modal.getInstance(document.getElementById('loginPromptModal')).hide();
                  navigate('/login');
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
