// AboutPage.js
import React from "react";
import "./homepage.css";
import Navbar from "../Navbar/navbar";
import { fetchAllEvents } from '../../../providers/eventDataSupabase';
import { useState, useEffect } from "react";
import CalendarComponent from "../../private_pages/Calendar/Calendar.js";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("cal"); // State for selected tab

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
    <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

    {selectedTab === "events" &&

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

    }

    {selectedTab === "cal" &&

      <CalendarComponent />

    }
  </div>
};

export default HomePage;
