import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  function handleClick(url) {
    navigate(`/${url}`);
  }

  return (
    <div className="p-navbar">
    <div className="p-navbar-logo"></div>

    <div className="p-navbar-buttons">
      <div
        className={`p-navbar-button`}
      >
        Events
      </div>

        <div
          onClick={() => {
            handleClick("login");
          }}
          className="p-navbar-button"
        >
          Log in
        </div>
    </div>

    </div>
      
  );
}

export default Navbar;
