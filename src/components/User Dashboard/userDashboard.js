import React from "react";
import './userDashboard.css'
import profileAvt from '../../assets/profile-user.png'

const UserDashboard = () => {
    return (
        <div className="profile-sidebar">
            <div className="mail-zone">
                <img className="mail-avt" src={profileAvt} alt="Avatar" />
                <div className="mail">Long Ho Truong Viet</div>
                <div className="mail">longext04@gmail.com</div>
            </div>
            <div className="menu-list">
                <a href="#">Account information</a>
                <br />
                <a href="#">List of orders</a>
                <br />
                <a href="#">PT registration</a>
                <br />
                <a href="#">Coupon wallet</a>
                <br />
                <a href="#">Sign out</a>
                <br />
            </div>
        </div>
    );
};

export default UserDashboard;
