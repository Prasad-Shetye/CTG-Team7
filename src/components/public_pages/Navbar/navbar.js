import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  function handleClick(url) {
    navigate(`/${url}`);
  }

  return (
    <div className="navbar">
      CRP - Team 7
      <div className="navbar-buttons">
        <div
          onClick={() => {
            handleClick("login");
          }}
          className="navbar-button"
        >
          Log in
        </div>
      </div>
    </div>
      
  );
}

export default Navbar;
