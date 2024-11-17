import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import "./info.css";
import React from "react";

function Info() {
  return (
    <>
      <NavBar />
      <div className="main-content">
        {}
        <div className="content">
          <div className="sidebar">
            <ul className="menu-items">
              <li>
                <a href='#'>Account information</a>
              </li>
              <li>
                <a href='#'>List of orders</a>
              </li>
              <li>
                <a href='#'>PT registration</a>
              </li>
              <li>
                <a href='#'>Coupon wallet</a>
              </li>
              <li>
                <a href='#'>Sign out</a>
              </li>
            </ul>
          </div>

          <div className="menu-sidebar">
            <div className="profile-picture" />
            <div className="user-mail">
              <h2>Long Ho Truong Viet</h2>
              <h2>longext04@gmail.com</h2>
            </div>
          </div>
        </div>

        <div className="sidebar-info">
          <h2>Account Information</h2>
          <div className="input-field">
            <label htmlFor="name">Họ và tên:</label>
            <input type="text" id="name" name="name" placeholder="Ho Truong Viet Long" />
          </div>

          <div className="input-row">
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="longext04@gmail.com" />
            </div>

            <div className="input-field">
              <label htmlFor="number">Số điện thoại:</label>
              <input type="text" id="number" name="number" placeholder="0987654321" />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="address">Địa chỉ:</label>
            <input type="text" id="address" name="address" placeholder="131 BLA BLA" />
          </div>

          <div className="input-field">
            <button type="submit">THAY ĐỔI</button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Info;
