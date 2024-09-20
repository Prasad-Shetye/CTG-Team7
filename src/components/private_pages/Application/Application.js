import React, { useState, useEffect } from 'react';
import './application.css';
import ProtectedNavbar from '../ProtectedNavbar/ProtectedNavbar';
import { fetchUserRole } from '../../../providers/fetchUserRole';

function Application({ handleLogOut }) {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch user data
  async function getUserData() {
    setUserRole(await fetchUserRole(userId))    
  }

  // Fetch user data from local storage
  useEffect(() => {
    const userDataString = localStorage.getItem("userSessionData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.user.id);
    }
  }, []);

  // If ID changes and is not null then fetch Role
  useEffect(() => {
    if(userId !== null) {
      getUserData()
    }
  }, [userId])

  return (
    <div className="Application">
      <ProtectedNavbar handleLogOut={handleLogOut} role={userRole}/>

         
      This is a protected route!
      <br />
      This is a {userRole}
    </div>
  );
}

export default Application;
