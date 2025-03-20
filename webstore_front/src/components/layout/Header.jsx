import React, { memo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useShopping } from "../../context/ShoppingContext";
import APP_ENV from "../../env";
import './layout.css';

const adminPages = [
  { title: "Categories", path: "/categories" },
  { title: "Users", path: "/users" },
  { title: "Clothing", path: "/clothing" },
  { title: "Manufacturers", path: "/manufacturers" },
];

const Header = memo(() => {
  const navigate = useNavigate();
  const { user, isAuth, role } = useSelector((store) => store.auth);
  const { logout } = useActions();
  const { cartItems, favoriteItems } = useShopping();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
      <header className="shadow-sm">
        <div className="bg-white py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <Link to="/" className="text-decoration-none">
                  <h1 className="m-0 h2 fw-bold text-uppercase">WEB STORE</h1>
                </Link>
              </div>

              <div className="col">
                <ul className="nav gap-4 justify-content-center">
                  <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-link px-0 text-dark fw-medium position-relative"
                        style={{
                          textDecoration: 'none',
                          ':hover': {
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: '100%',
                              height: '2px',
                              bottom: 0,
                              left: 0,
                              backgroundColor: 'currentColor',
                              transform: 'scaleX(0)',
                              transition: 'transform 0.3s ease'
                            }
                          }
                        }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Products" className="nav-link px-0 text-dark fw-medium">
                      New Arrivals
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products?category=Взуття" className="nav-link px-0 text-dark fw-medium">
                      Shoes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products?category=Аксесуари" className="nav-link px-0 text-dark fw-medium">
                      Accessories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products?category=Одяг" className="nav-link px-0 text-dark fw-medium">
                      Сlothes
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-auto">
                <div className="d-flex align-items-center gap-4">
                  <Link to="/favoriteProducts" className="text-reset position-relative">
                    <Favorite className="fs-4" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {favoriteItems.length}
                    </span>
                  </Link>


                  <Link to="/cartItems" className="text-reset position-relative">
                    <ShoppingCart className="fs-4" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {cartItems.length}
                    </span>
                  </Link>

                  {isAuth ? (
                      <div className="dropdown">
                        <a
                            className="dropdown-toggle d-flex align-items-center text-decoration-none text-dark"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                          <img
                              src={`${APP_ENV.USER_IMAGE_URL}${user.image}`}
                              className="rounded-circle me-2"
                              height="35"
                              width="35"
                              alt="User Avatar"
                              loading="lazy"
                          />
                          <span className="fw-medium">{user.name}</span>
                        </a>
                        
                        <ul className="dropdown-menu dropdown-menu-end shadow">
                          {role === "admin" && (
                              <li>
                                <Link className="dropdown-item" to="/profile">
                                  My Profile
                                </Link>
                              </li>
                          )}
                          {role === "admin" && adminPages.map((page) => (
                              <li key={page.path}>
                                <Link className="dropdown-item" to={page.path}>
                                  {page.title}
                                </Link>
                              </li>
                          ))}
                          
                          {role === "user" && (
                              <li>
                                <Link className="dropdown-item" to="/profile">
                                  My Profile
                                </Link>
                              </li>
                          )}
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <button className="dropdown-item text-danger" onClick={logoutHandler}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                  ) : (

                      <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-dark">
                          Sign in
                        </Link>
                        <Link to="/register" className="btn btn-dark">
                          Sign Up
                        </Link>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
});

export default Header;