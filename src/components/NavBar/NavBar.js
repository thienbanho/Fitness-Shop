import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import Logo from "../../assets/logo.png";
import LogoSearch from "../../assets/search.png";
import LogoProfile from "../../assets/profile-user.png";
import LogoCart from "../../assets/shopping-cart.png";
import "./navBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);

        // Redirect to the info page only if the user is on login or signup pages
        if (
          location.pathname === "/pages/LoginSignUp/Login" ||
          location.pathname === "/pages/LoginSignUp/Signup"
        ) {
          navigate("/pages/Profile/Info");
        }
      }
    };

    checkUser();
  }, [navigate, location]);

  return (
    <div className="nav_bar">
      <img className="logo" src={Logo} alt="Logo" />
      <ul className="nav-links">
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
          <img src={LogoSearch} alt="search" />
        </a>
        <Link to={user ? "/pages/Profile/Info" : "../../pages/LoginSignUp/Login"}>
          <img src={LogoProfile} alt="profile" />
        </Link>
        <a href="#">
          <img src={LogoCart} alt="cart" />
        </a>
      </div>
    </div>
  );
}

export default NavBar;
