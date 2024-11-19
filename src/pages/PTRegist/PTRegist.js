import React from 'react';
import './PTRegist.css';
import ProfileBox from '../../components/ProfileBox/profileBox';
import PTRegistrationForm from '../../components/PTcontract/contract';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const PTRegist = () => {
  return (
    <>
      <NavBar />

      <div className="pt-regist">
        {/* Profile Box */}
        <ProfileBox />

        {/* Contract */}
        <PTRegistrationForm />
      </div>
      
      <Footer />
    </>
  );
};

export default PTRegist;