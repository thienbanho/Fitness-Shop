import React from 'react';
import './HirePT.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import CategoryNav from '../../components/CategoryNavbar/CategoryNav';
import Sidebar from '../../components/SideBar/Sidebar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

// navbar components
import pt_3_4 from '../../assets/PTTypes/3.4.png';
import pt_3_6 from '../../assets/PTTypes/3.6.png';
import pt_4_0 from '../../assets/PTTypes/4.0.png'
import pt_4_2 from '../../assets/PTTypes/4.2.png';
import pt_4_3 from '../../assets/PTTypes/4.3.png';
import pt_4_9 from '../../assets/PTTypes/4.9.png';

// product grid components
import pt1 from '../../assets/PTs/pt1.png';
import pt2 from '../../assets/PTs/pt2.png';
import pt3 from '../../assets/PTs/pt3.png';
import pt4 from '../../assets/PTs/pt4.png';
import pt5 from '../../assets/PTs/pt5.png';
import pt6 from '../../assets/PTs/pt6.png';


const HirePT = () => {
  return (
    <>
      <NavBar />

      <div className='product'>
        <div className="container">
          {/* Category Navigation */}
          <CategoryNav
            nav1={pt_3_4} nameNav1="3.4★"
            nav2={pt_3_6} nameNav2="3.6★"
            nav3={pt_4_0} nameNav3="4.0★"
            nav4={pt_4_2} nameNav4="4.2★"
            nav5={pt_4_3} nameNav5="4.3★"
            nav6={pt_4_9} nameNav6="4.9★"
          />

          {/* Main Content */}
          <div className="content">
          
            {/* Sidebar */}
            <Sidebar
              type1="Price" op11="Option 1" op12="Option 2" op13="Option 3" op14="Option 4"
              type2="Field" op21="Option 1" op22="Option 2" op23="Option 3" op24="Option 4"
              type3="Rating" op31="Option 1" op32="Option 2" op33="Option 3" op34="Option 4"
            />

            {/* Product Grid */}
            <ProductGrid
              product1={pt1} name1="Võ Hoàng Anh Khoa" price1="1,750,000đ"
              product2={pt2} name2="Nguyễn Trần Đức Thiện" price2="1,750,000đ"
              product3={pt3} name3="Nguyễn Đình Kiên" price3="1,750,000đ"
              product4={pt4} name4="Võ Hoàng Anh Khoa" price4="1,750,000đ"
              product5={pt5} name5="Nguyễn Trần Đức Thiện" price5="1,750,000đ"
              product6={pt6} name6="Nguyễn Đình Kiên" price6="1,750,000đ"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HirePT;