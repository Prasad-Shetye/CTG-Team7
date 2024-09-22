import React from "react";
import "./protectedNavbar.css";

function ProtectedNavbar({ handleLogOut, role, name, selectedTab, setSelectedTab }) {

  return (
    <div className="p-navbar">
      <div className="p-navbar-logo"></div>
      <div className="p-navbar-text">
        Welcome, {name}
      </div>

      <div className="p-navbar-buttons">
      <div
      onClick={() => setSelectedTab('Events')}
      className={`p-navbar-button ${selectedTab === 'Events' ? '' : 'active'}`}
    >
      Events
    </div>
  <div
      onClick={() => setSelectedTab('Cal')}
      className={`p-navbar-button ${selectedTab === 'Cal' ? '' : 'active'}`}
    >
      Community Calendar
    </div>
    
        {role === "Admin" && (
          <>
            <div
              onClick={() => setSelectedTab('Analytics')}
              className={`p-navbar-button ${selectedTab === 'Analytics' ? '' : 'active'}`}
            >
              Analytics
            </div>
            <div
              onClick={() => setSelectedTab('Broadcast Message')}
              className={`p-navbar-button ${selectedTab === 'Broadcast Message' ? '' : 'active'}`}
            >
              Broadcast Message
            </div>
          </>
        )}

        <div
          onClick={handleLogOut}
          className="active p-navbar-button"
        >
          Log Out
        </div>
      </div>

    </div>
  );
}

export default ProtectedNavbar;
