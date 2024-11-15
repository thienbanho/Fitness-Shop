import React from "react";
import './profileBox.css'
import profileAvt from '../assets/img/avatar.png'

const ProfileBox = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="avt" src={profileAvt} alt="Avatar" />
                <div className="name">Nguyen Tran Duc Thien</div>
                <div className="email">ngtranducthien@gmail.com</div>
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

export default ProfileBox;