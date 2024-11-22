import React from 'react';
import './PTRegist.css';
import ProfileBox from './components/profileBox';
import PTRegistrationForm from './components/contract';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const PTRegist = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className="pt-regist">
        {/* Profile Box */}
        <ProfileBox />

        {/* Contract */}
        <PTRegistrationForm />
      </div>
      
      <Footer></Footer>
    </>
  );
};

export default PTRegist;