import React from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/LoginSignUp/Login.js"
import PTRegist from "./pages/PTRegist/PTRegist.js";
import Product from "./pages/Product/Product.js";
import Info from "./pages/Profile/Info/info.js";
import NavBar from "./components/NavBar/NavBar.js";
import Footer from "./components/Footer/Footer.js";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import RoleManagementPage from "./components/User Dashboard/RoleManagementPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/pages/Home" element={<Home/>}/>
      <Route path="/pages/LoginSignup/Login" element={<Login/>}/>
      <Route path="/pages/PTRegist/PTRegist" element={<PTRegist/>}/>
      <Route path="/pages/Product" element={<Product/>}/>
      <Route path="/pages/Profile/Info" element={<Info/>}/>
      <Route path="/components/UserDashboard/RoleManagementPage" element={<RoleManagementPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
