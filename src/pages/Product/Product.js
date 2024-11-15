import React from 'react';
import './Product.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import CategoryNav from './components/CategoryNav';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

const Product = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className='product'>
        <div className="container">
          {/* Category Navigation */}
          <CategoryNav />

          {/* Main Content */}
          <div className="content">
            {/* Sidebar */}
            <Sidebar />

            {/* Product Grid */}
            <ProductGrid />
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Product;