import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./coupon_wallet.css";
import userDashboard from "../../components/userDashboard/userDashboard";

function CouponWallet() {
  return (
    <>
      <NavBar />
      <div className="coupon-wallet">
        <userDashboard />
        
        <div className="coupon-container">
          <div className="coupon-header"><h1>My voucher</h1>
            <div className="coupon-row">
            <div className="coupon-box coupon-available">Voucher available</div>
            <div className="coupon-box coupon-unavailable">Voucher unavailable</div>
          </div>

          <div className="no-coupon">You don't have any voucher yet.</div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default CouponWallet;
