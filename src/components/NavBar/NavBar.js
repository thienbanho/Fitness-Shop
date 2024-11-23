import Logo from "../../assets/logo.png";
import LogoSearch from "../../assets/search.png";
import LogoProfile from "../../assets/profile-user.png";
import LogoCart from "../../assets/shopping-cart.png";
import Home from "../../pages/Home/Home";
import "./navBar.css";
import React from "react";
import { Link } from "react-router";

function NavBar() {
  return (
    <div className="nav_bar">
      <img className="logo" src={Logo} alt="Logo"></img>
      <ul class="nav-links">
        <li>
          <Link to="../../pages/Home">HOME</Link>
        </li>
        <li>
          <Link to="../../pages/Product">PRODUCTS</Link>
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
        <Link to="../../pages/LoginSignUp/Login">
          <img src={LogoProfile} alt="profile"></img>
        </Link>
        <a href="#">
          <img src={LogoCart} alt="cart"></img>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
