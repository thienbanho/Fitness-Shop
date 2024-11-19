import React from 'react';
import './Product.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import CategoryNav from '../../components/CategoryNavbar/CategoryNav';
import Sidebar from '../../components/SideBar/Sidebar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

// navbar components
import wheyProtein from '../../assets/ProductTypes/whey-protein.png';
import massGainer from '../../assets/ProductTypes/mass-gainer.png';
import bcaa from '../../assets/ProductTypes/bcaa.png';
import preWorkout from '../../assets/ProductTypes/pre-workout.png';
import omega3 from '../../assets/ProductTypes/omega3.png';
import supplements from '../../assets/ProductTypes/supplements.png';

// product grid components
import whey from "../../assets/Products/whey.png";

const Product = () => {
  return (
    <>
      <NavBar />

      <div className='product'>
        <div className="container">
          {/* Category Navigation */}
          <CategoryNav
            nav1={wheyProtein} nameNav1="Whey Protein"
            nav2={massGainer} nameNav2="Mass Gainer"
            nav3={bcaa} nameNav3="BCAA"
            nav4={preWorkout} nameNav4="Pre-Workout"
            nav5={omega3} nameNav5="Omega-3"
            nav6={supplements} nameNav6="Supplements"
          />

          {/* Main Content */}
          <div className="content">
          
            {/* Sidebar */}
            <Sidebar
              type1="Price" op11="Option 1" op12="Option 2" op13="Option 3" op14="Option 4"
              type2="Brand" op21="Option 1" op22="Option 2" op23="Option 3" op24="Option 4"
              type3="Kind" op31="Option 1" op32="Option 2" op33="Option 3" op34="Option 4"
            />

            {/* Product Grid */}
            <ProductGrid
              product1={whey} name1="Hydrolyzed Whey Protein 100%" price1="1,750,000đ"
              product2={whey} name2="Hydrolyzed Whey Protein 100%" price2="1,750,000đ"
              product3={whey} name3="Hydrolyzed Whey Protein 100%" price3="1,750,000đ"
              product4={whey} name4="Hydrolyzed Whey Protein 100%" price4="1,750,000đ"
              product5={whey} name5="Hydrolyzed Whey Protein 100%" price5="1,750,000đ"
              product6={whey} name6="Hydrolyzed Whey Protein 100%" price6="1,750,000đ"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
