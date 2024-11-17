import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import "./coupon_wallet.css";

function Coupon() {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <div className="content">
          <div className="sidebar">
            <ul className="menu-items">
              <li>Account Information</li>
              <li>List of orders</li>
              <li>PT registration</li>
              <li>Coupon wallet</li>
              <li>Sign out</li>
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

        <div className="sidebar-coupon">
          <h2>My voucher</h2>
          <div className="coupon-row">
            <div className="coupon-box coupon-available">
              Voucher available
            </div>
            <div className="coupon-box coupon-unavailable">
              Voucher unavailable
            </div>
            <div className="no-coupon">
            You don't have any voucher yet.
          </div>
          </div>
          </div>
      </div>
      <Footer />
    </>
  );
}

export default Coupon;
