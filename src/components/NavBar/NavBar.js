import Logo from "../../assets/logo.png";
import LogoSearch from "../../assets/search.png";
import LogoProfile from "../../assets/profile-user.png";
import LogoCart from "../../assets/shopping-cart.png";
import "./navBar.css";
import React from "react";
// import { Link } from "react-router-dom";

import Product from "../../pages/Product/Product";

function NavBar() {
  return (
    <div className="nav_bar">
      <img className="logo" src={Logo} alt="Logo"></img>
      <ul class="nav-links">
        <li>
          <a href="#">HOME</a>
        </li>
        {/* <li>
          <Link to={Product}>PRODUCTS</Link>
        </li> */}
        <li>
          <a href="#">PRODUCTS</a>
        </li>
        <li>
          <a href="#">HIRE PT</a>
        </li>
        <li>
          <a href="#">ABOUT</a>
        </li>
      </ul>
      <div className="icon">
        <a href="#">
          <img src={LogoSearch} alt="search"></img>
        </a>
        <a href="#">
          <img src={LogoProfile} alt="profile"></img>
        </a>
        <a href="#">
          <img src={LogoCart} alt="cart"></img>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
