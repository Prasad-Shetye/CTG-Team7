import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '../../../providers/eventDataSupabase';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const fetchedEvents = await fetchAllEvents();
                setEvents(fetchedEvents);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Events</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>{event.subject}</strong>: {event.message} <br />
                            <small>{event.eventdate}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
}

export default Events;
