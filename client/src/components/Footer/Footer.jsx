import React, { Component } from "react";
import { NavLink} from "react-router-dom";


const Footer = () => {
  
  const scroll = () => {
    window.scrollTo(0,0);
  }

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer-left">
              <div className="footer-logo">
                <a href="#">
                  <img src="img/FooterCapture.png" alt="" />
                </a>
              </div>
              <ul>
                <li>Address: ABC Building XYZ Road India</li>
                <li>Phone: +91 9999 9999 999</li>
                <li>Email: admin@bookworms.com</li>
              </ul>
              <div className="footer-social">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1">
            <div className="footer-widget">
              <h5>Information</h5>
              <ul>
                <li>
                <NavLink onClick={scroll}  exact activeClassName="active" to="/aboutus">About us</NavLink>
                </li>
                <li>
                <NavLink onClick={scroll}  exact activeClassName="active" to="/faq">FAQs</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-widget">
              <h5>My Account</h5>
              <ul>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                <NavLink onClick={scroll} activeClassName="active" to="/contact">
                  Contact
                </NavLink>
                </li>
                <li>
                  <a href="#">Book Store</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="newslatter-item">
              <h5>Join Our Newsletter Now</h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="#" className="subscribe-form">
                <input type="text" placeholder="Enter Your Mail" />
                <button type="button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-reserved">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text">
                Copyright &copy; BookWorms 2021 All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
