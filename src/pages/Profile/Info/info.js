import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import UserDashboard from "../../components/User Dashboard/userDashboard";
import "./info.css";

function profileInfo() {
  return (
    <>
      <NavBar />
      <div className="account_information">
        <UserDashboard />
        
        <div className="info-container">
          <div className="info-header">
            <h1>Account information</h1>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Họ và tên:</label>
            <input type="text" id="name" name="name"/>
          </div>

          <div className="form-group input-row">
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"/>
            </div>
            <div className="input-field">
              <label htmlFor="phone">Số điện thoại:</label>
              <input type="tel" id="phone" name="phone"/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ:</label>
            <input type="text" id="address" name="address"/>
          </div>

          <button type="submit" className="submit-btn">THAY ĐỔI</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default profileInfo;
