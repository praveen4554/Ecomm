import "./Header.css";
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import {
  FaShoppingCart,
  FaInstagram,
  FaPinterest,
  FaFacebook
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const count = useSelector((state) => state.itemCart?.count);
  const navigate = useNavigate();
  const navigateToCart = () => navigate("/cart");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="header">
        <div className="social-icons">
          <IconContext.Provider value={{ className: "reactIcons" }}>
            <FaInstagram />
            <FaPinterest />
            <FaFacebook />
          </IconContext.Provider>
        </div>
        <img src="./Ahmay.jpeg" alt="logo" className="logo" />
        <div className="right-icons">
          <IconContext.Provider value={{ className: "reactIcons" }}>
            <div className="shoppingCart" onClick={() => navigateToCart()}>
              <FaShoppingCart />
              <span className="count">({count})</span>
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <nav className="primary-nav">
           <NavLink to="/">HOME</NavLink>
        <div
          className="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="menu-button">
            <NavLink to="shop-page">SHOP</NavLink>
            <FaChevronRight
              className={`icon ${dropdownOpen ? "rotate" : ""}`}
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-column">
                <h4>STYLE</h4>
                <a href="#link1">THE ERICA SKIRT</a>
                <a href="#link2">TOPS</a>
                <a href="#link3">BOTTOMS</a>
                <a href="#link4">DRESSES + ROMPERS</a>
                <a href="#link5">JACKETS</a>
                <a href="#link6">PAJAMAS</a>
                <a href="#link7">T-SHIRTS</a>
                <a href="#link8">SWEATSHIRTS + LOUNGE</a>
                <a href="#link9">SWEATERS</a>
                <a href="#link10">ACCESSORIES + MORE</a>
              </div>
              <div className="dropdown-column">
                <h4>COLLECTION</h4>
                <a href="#link11">SUMMER ARCHIVES</a>
                <a href="#link12">CAPSULE</a>
              </div>
              <div className="dropdown-column">
                <h4>LOOKS WE LOVE</h4>
                <a href="#link13">MATCHING SETS</a>
                <a href="#link14">KOCH HOUSE EXCLUSIVES</a>
              </div>
              <div className="dropdown-column">
                <h4>LAST CHANCE - 60% OFF</h4>
                <a href="#link15">BOTTOMS</a>
                <a href="#link16">DRESSES</a>
                <a href="#link17">JACKETS</a>
                <a href="#link18">LOUNGE</a>
                <a href="#link19">TOPS</a>
              </div>
              <div className="dropdown-column">
                <h4>NICOLE'S CLOSET</h4>
              </div>
            </div>
          )}
        </div>
        <span className="nav-carat-small">
          <i className="fa-thin fa-square-chevron-down"></i>
        </span>
        <NavLink to="about-us">WHAT'S NEW</NavLink>
        <NavLink to="contact-us">CONTACT US</NavLink>
        <NavLink to="supplier-management">SUPPLIER MANAGEMENT</NavLink>
        <NavLink to="sales-report">Sales Report</NavLink>
        <NavLink to="Product-Mangement">Product Management</NavLink>

      </nav>
    </>
  );
}

export default Header;
