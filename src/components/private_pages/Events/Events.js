import React, { useEffect, useState } from 'react';
import { addEventUserRelation, fetchAllEvents, fetchRSVPedEvents, removeEventUserRelation } from '../../../providers/eventDataSupabase';
import "./events.css";

function Events({ userId }) {
    const [events, setEvents] = useState([]);
    const [rsvpEvents, setRsvpEvents] = useState([]);  // Stores events the user has RSVP'd to
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const fetchedEvents = await fetchAllEvents();
                setEvents(fetchedEvents);

                // Fetch RSVP'd events for the current user
                if (userId) {
                    const rsvpEventIds = await fetchRSVPedEvents(userId);
                    const userRSVPedEvents = fetchedEvents.filter(event => rsvpEventIds.includes(event.id));
                    setRsvpEvents(userRSVPedEvents);

                    // Remove RSVP'd events from all events list
                    const nonRsvpedEvents = fetchedEvents.filter(event => !rsvpEventIds.includes(event.id));
                    setEvents(nonRsvpedEvents);
                }
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, [userId]);

    if (loading) {
        return <div className="events-loading">Loading...</div>;
    }

    if (error) {
        return <div className="events-error">{error}</div>;
    }

    // RSVP to an event
    async function rsvp_user(user_id, event_id) {
        await addEventUserRelation(user_id, event_id);

        // Update RSVP'd events list after RSVP
        const updatedRsvpEvents = [...rsvpEvents, events.find(event => event.id === event_id)];
        setRsvpEvents(updatedRsvpEvents);

        // Remove the event from the "All Events" list
        const remainingEvents = events.filter(event => event.id !== event_id);
        setEvents(remainingEvents);
    }

    // Un-RSVP from an event
    async function unRsvp_user(user_id, event_id) {
        await removeEventUserRelation(user_id, event_id);

        // Update RSVP'd events list after un-RSVP
        const remainingRsvpEvents = rsvpEvents.filter(event => event.id !== event_id);
        setRsvpEvents(remainingRsvpEvents);

        // Add the event back to the "All Events" list
        const unRsvpedEvent = rsvpEvents.find(event => event.id === event_id);
        setEvents([...events, unRsvpedEvent]);
    }

    return (
        <div className="events-container">

                    {/* My Events Section */}
                    <div className="events-header">
                    <h2>My Events</h2>
                </div>
                {rsvpEvents.length > 0 ? (
                    <div className="events-list">
                        {rsvpEvents.map((event) => (
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
                                {userId && (
                                    <div onClick={() => unRsvp_user(userId, event.id)} className="events-unrsvp">
                                        Un-RSVP
                                    </div>
                                )}
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="events-empty">
                        <p>You have not RSVP'd to any events yet.</p>
                    </div>
                )}
    
            <div className="events-header">
                <h2>Other Events</h2>
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
                            {userId && (
                                <div onClick={() => rsvp_user(userId, event.id)} className="events-rsvp">
                                    RSVP
                                </div>
                            )}
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
}

export default Events;
