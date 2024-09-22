// AboutPage.js
import React from "react";
import "./homepage.css";
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { addEventUserRelation, fetchAllEvents, fetchRSVPedEvents, removeEventUserRelation } from '../../../providers/eventDataSupabase';
import { useState, useEffect } from "react";

const HomePage = () => {

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const navigate = useNavigate();

  function handleNav(url) {
    navigate(`/${url}`);
  }
  const [events, setEvents] = useState([]);
  const [rsvpEvents, setRsvpEvents] = useState([]);  // Stores events the user has RSVP'd to
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchAllEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to fetch events');
      };
    }
    getEvents();
  }, []);

  return <div className="HomePage">
    <Navbar />


    <div className="events-container">

      <div className="events-header">
        <h2>Community Events</h2>
      </div>
      {events.length > 0 ? (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="events-item">
              <div className="events-item-subject">
                <strong>{event.subject}</strong>
              </div>
              <div className="events-item-message">
                {event.message}
              </div>
              <div className="events-item-date">
                <small>{event.eventdate}</small>
              </div>

              <br />
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div className="events-empty">
          <p>No other events found.</p>
        </div>
      )}

    </div>
    );
  </div>
};

export default HomePage;
