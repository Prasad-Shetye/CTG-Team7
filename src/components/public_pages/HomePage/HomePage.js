// AboutPage.js
import React from "react";
import "./homepage.css";
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  
  const navigate = useNavigate();
  
  function handleNav(url) {
    navigate(`/${url}`);
  }
    
  return <div className="HomePage">
    <Navbar />
    Landing Page
  </div>
};

export default HomePage;
