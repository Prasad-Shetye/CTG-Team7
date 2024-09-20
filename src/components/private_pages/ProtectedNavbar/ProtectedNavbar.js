import React from "react";
import { useNavigate } from "react-router-dom";
import "./protectedNavbar.css";

function ProtectedNavbar({handleLogOut}) {
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
            handleLogOut()
          }}
          className="navbar-button"
        >
          Log Out
        </div>
      </div>
    </div>
      
  );
}

export default ProtectedNavbar;
