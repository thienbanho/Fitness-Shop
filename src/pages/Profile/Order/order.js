import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./order.css";
import UserDashboard from "../../components/User Dashboard/userDashboard";

function orderManagement() {
  return (
    <>
      <NavBar />
      <div className="order-management">
        <UserDashboard />
        
        <div className="order-container">
            <div className="order-header">
                <h1>Order management</h1>
            </div>

            <div className="order-sub-header">
                <a>Shipping</a>
                <a>Delivered</a>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderManagement;
