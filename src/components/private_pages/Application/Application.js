import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './application.css';
import ProtectedNavbar from '../ProtectedNavbar/ProtectedNavbar';

function Application({ handleLogOut }) {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  function Loading() {
    return <>Loading!</>;
  }

  // Fetch user data from local storage
  useEffect(() => {
    const userDataString = localStorage.getItem("userSessionData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.user.id);
    }
  }, []);

  return (
    <div className="Application">
      <ProtectedNavbar handleLogOut={handleLogOut} />
      This is a protected route! Boo!
    </div>
  );
}

export default Application;
