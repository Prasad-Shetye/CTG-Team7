import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();


  function handleClick(url, tab) {
    setSelectedTab(tab); // Set the selected tab when navigating
  }

  function handleClickTo(url) {
    navigate(`/${url}`);
 }

  return (
    <div className="p-navbar">
      <div className="p-navbar-logo"></div>

      <div className="p-navbar-buttons">
        <div
          onClick={() => handleClick("calendar", "cal")}
          className={`p-navbar-button ${selectedTab === "cal" ? "" : "active"}`}
        >
          Community Calendar
        </div>
        <div
          onClick={() => handleClick("events", "events")}
          className={`p-navbar-button ${selectedTab === "events" ? "" : "active"}`}
        >
          Events
        </div>

        <div
          onClick={() => handleClickTo("login")}
          className="p-navbar-button"
        >
          Log in
        </div>
      </div>
    </div>
  );
}

export default Navbar;
