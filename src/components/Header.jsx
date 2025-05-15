import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-link text-black p-0">
              <i className="bi bi-search fs-4"></i>
            </button>

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

            <button className="btn btn-link text-black p-0 position-relative">
              <i className="bi bi-cart fs-4"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
          </div>
        </div>
      </nav>

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
