import React, { useState, useEffect } from 'react';
import './application.css';
import ProtectedNavbar from '../ProtectedNavbar/ProtectedNavbar';
import { fetchUserRole, fetchUserName } from '../../../providers/fetchUserData';
import Events from '../Events/Events';
import Broadcast from '../Broadcast/Broadcast';
import Analytics from '../Analytics/Analytics';
import CalendarComponent from '../Calendar/Calendar.js';
import { FiMessageCircle } from 'react-icons/fi'; // Adding an icon for feedback button

function Application({ handleLogOut }) {
  const [userId, setUserId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Events");
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userEmail, setUserEmail] = useState("");

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

  const submitFeedback = () => {
    console.log('Feedback submitted:', { feedback, userEmail });
    setFeedbackVisible(false);
    setFeedback(""); // Reset feedback field
    setUserEmail(""); // Reset email field
    // You can send the feedback to your backend here
  };

  return (
    <div className="Application">
      <ProtectedNavbar handleLogOut={handleLogOut} role={userRole} name={userName} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {selectedTab === "Cal" && <><br /><CalendarComponent /></>}
      {selectedTab === "Events" && <Events userId={userId} />}
      {selectedTab === "Broadcast Message" && <Broadcast />}
      {selectedTab === "Analytics" && <Analytics />}
      {/* Floating Feedback Button */}
      <button 
        className="feedback-button"
        onClick={() => setFeedbackVisible(!feedbackVisible)}
      >
        Feedback
      </button>

      {/* Floating Feedback Button */}
      <button 
        className="feedback-button"
        onClick={() => setFeedbackVisible(!feedbackVisible)}
      >
        <FiMessageCircle size={20} />
        Issues?
      </button>

      {/* Feedback Popup */}
      {feedbackVisible && (
        <div className="feedback-popup">
          <h3>We would love to address your issues!</h3>
          <input 
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Your email (optional)"
          />
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your issues here..."
          />
          <button onClick={submitFeedback}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Application;
