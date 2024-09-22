import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRSVPCounts } from '../../../providers/eventDataSupabase';
import "./analytics.css"

function Analytics() {
    const [rsvpData, setRsvpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRsvpData = async () => {
            try {
                const fetchedData = await fetchRSVPCounts();
                setRsvpData(fetchedData);
            } catch (err) {
                setError('Failed to fetch RSVP data');
            } finally {
                setLoading(false);
            }
        };

        getRsvpData();
    }, []);

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
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rsvp_count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Analytics;
