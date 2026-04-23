import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-waves-container">
      {/* Liquid Wave Transition */}
      <svg 
        className="waves" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" 
        preserveAspectRatio="none" 
        shapeRendering="auto"
      >
        <defs>
          <path 
            id="gentle-wave" 
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" 
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" />
          <use xlinkHref="#gentle-wave" x="48" y="3" />
          <use xlinkHref="#gentle-wave" x="48" y="5" />
          <use xlinkHref="#gentle-wave" x="48" y="7" />
        </g>
      </svg>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>House of Urvaah</h2>
            <p>Where tradition breathes in every thread. Handcrafted elegance for the modern soul, rooted in heritage.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Shop by Occasion</a></li>
              <li><a href="#">Our Story</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Email Support</a></li>
              <li><a href="#">Visit Store</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 HOUSE OF URVAAH. ALL RIGHTS RESERVED. DESIGNED FOR LUXURY.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
