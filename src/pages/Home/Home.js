import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../assets/gym_background.png";
import Product from "../../assets/productSection.png";
import PT from "../../assets/PTSection.png";
import "./Home.css";
import React from "react";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="main-content">
        <div className="banner-container">
          <img className="banner" src={Banner} alt="banner"></img>
        </div>

        <div className="product-section">
          <div className="product-container">
            <a href="#" className="product-tag">
              PRODUCT
            </a>
          </div>
        </div>

        <div className="trainer-section">
          <div className="trainer-container">
            <a href="#" className="trainer-tag">
              PERSONAL TRAINER
            </a>
          </div>
        </div>

        
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
