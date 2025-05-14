import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-black" to="/">
          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="Logo" className="me-2" />
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
          <Link to="/login" className="btn btn-link text-black p-0">
          <button className="btn btn-link text-black p-0">
            <i className="bi bi-person fs-3"></i>
          </button>
          </Link>
          <button className="btn btn-link text-black p-0 position-relative">
            <i className="bi bi-cart fs-4"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
