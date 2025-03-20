import React from 'react';
import './layout.css';
import { FaFacebookF, FaTwitter, FaRss, FaGooglePlusG } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-2">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-4">
            <h2 className="logo fw-bold fs-4"><i class="bi bi-shop "></i> Web store</h2>
          </div>
          <div className="col-md-4">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a href="/" className="nav-link text-white fw-bold fs-10">Home</a>
              </li>
              <li className="nav-item">
                <a href="/products" className="nav-link text-white fw-bold fs-10">Products</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white fw-bold fs-10">About</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link text-white fw-bold fs-10">Suppport</a>
              </li>
              
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <a href="#" className="text-white me-3 fs-4"><FaFacebookF /></a>
            <a href="#" className="text-white me-3 fs-4"><FaTwitter /></a>
            <a href="#" className="text-white me-3 fs-4"><FaRss /></a>
            <a href="#" className="text-white me-3 fs-4"><FaGooglePlusG /></a>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center ">© Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
