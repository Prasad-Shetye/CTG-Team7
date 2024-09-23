import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRSVPCounts, fetchUserIdsByEvent, fetchUserDetails } from '../../../providers/eventDataSupabase';
import "./analytics.css";

function Analytics() {
    const [rsvpData, setRsvpData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRsvpData = async () => {
            try {
                const fetchedData = await fetchRSVPCounts();
                setRsvpData(fetchedData);

                // Fetch user IDs and details for each event
                const allUserDetails = await Promise.all(
                    fetchedData.map(async (event) => {
                        const userIds = await fetchUserIdsByEvent(event.event_id);
                        const userDetails = await fetchUserDetails(userIds);
                        return { eventId: event.event_id, eventSubject: event.subject, users: userDetails };
                    })
                );
                console.log(allUserDetails)
                setUserData(allUserDetails);
            } catch (err) {
                setError('Failed to fetch RSVP data');
            } finally {
                setLoading(false);
            }
        };

        getRsvpData();
    }, []);

    const truncate = (str, maxLength) => {
        return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="analytics">
            <div className="analytics-container">
                <h2>RSVP Analytics</h2>
                <ResponsiveContainer className="analytics-chart" height={250}>
                    <BarChart data={rsvpData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="subject"
                            interval={0}
                            tickFormatter={(subject) => truncate(subject, 10)} // Truncate to 10 characters
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="rsvp_count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <h3>Attendee Information</h3>
                {userData.map((eventData) => (
                    <div key={eventData.eventId}>
                        <h4>Event: {eventData.eventSubject}</h4>
                        {eventData.users.map((user, index) => (
                            <div key={index} className="attendee">
                                <div className="attendee-info"><strong>Name:</strong> {user.full_name}</div>
                                <div className="attendee-info"><strong>Email:</strong> {user.email}</div>
                                <div className="attendee-info"><strong>Phone:</strong> {user.phone_number}</div>
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Analytics;
