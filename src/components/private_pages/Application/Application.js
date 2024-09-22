import React, { useState, useEffect } from 'react';
import './application.css';
import ProtectedNavbar from '../ProtectedNavbar/ProtectedNavbar';
import { fetchUserRole, fetchUserName } from '../../../providers/fetchUserData';
import Events from '../Events/Events';
import Broadcast from '../Broadcast/Broadcast';
import Analytics from '../Analytics/Analytics';
import CalendarComponent from '../Calendar/Calendar.js';

function Application({ handleLogOut }) {
  const [userId, setUserId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Events");
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  // Fetch user data
  async function getUserData() {
    setUserRole(await fetchUserRole(userId))    
    setUserName(await fetchUserName(userId))    
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
      <ProtectedNavbar handleLogOut={handleLogOut} role={userRole} name={userName} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {selectedTab === "Cal" && <CalendarComponent />}
      {selectedTab === "Events" && <Events userId={userId} />}
      {selectedTab === "Broadcast Message" && <Broadcast />}
      {selectedTab === "Analytics" && <Analytics />}
    </div>
  );
}

export default Application;
