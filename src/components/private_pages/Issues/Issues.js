import React, { useEffect, useState } from 'react';
import { fetchAllIssues } from '../../../providers/eventDataSupabase';
import "./issues.css";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch issues when the component mounts
    const getIssues = async () => {
      const data = await fetchAllIssues();
      setIssues(data);
      setLoading(false);
    };
    getIssues();
  }, []);

  if (loading) {
    return <div className="issues-loading">Loading issues...</div>;
  }

  return (
    <div className="issues-container">
      <h2 className="issues-title">All Issues</h2>
      {issues.length === 0 ? (
        <p className="issues-empty">No issues found.</p>
      ) : (
        <div className="issues-list">
          {issues.map((issue) => (
            <div key={issue.id} className="issue-item">
              <div className="issue-email">
                <strong>Message:</strong> {issue.email}
              </div>
              <div className="issue-message">
                <strong>Email:</strong> {issue.message}
              </div>
              <div className="issue-date">
                <strong>Date Submitted:</strong> {new Date(issue.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Issues;
