import React, { useState } from 'react';
import './broadcast.css';
import { getAIDraft } from '../../../providers/ai/generateBroadcast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postEventData } from '../../../providers/eventDataSupabase';
import { sendNotification } from '../../../Twilio/broadcast';

const Broadcast = () => {
  const [subject, setSubject] = useState('');
  const [subcategory, setSubcategory] = useState([]);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [notifyMethods, setNotifyMethods] = useState([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [draftLoading, setDraftLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [eventDate, setEventDate] = useState(null);

  const subcategoryOptions = [
    'Town Hall Meeting', 'Community Event', 'Volunteer Opportunity', 'Meet & Greet', 'Other'
  ];

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setSubcategory(subcategory.filter((option) => option !== value));
    } else {
      setSubcategory([...subcategory, value]);
    }
  };

  const handleNotifyMethodsChange = (e) => {
    const value = e.target.value;
    if (notifyMethods.includes(value)) {
      setNotifyMethods(notifyMethods.filter((method) => method !== value));
    } else {
      setNotifyMethods([...notifyMethods, value]);
    }
  };

  async function handleAIDraft() {
    setDraftLoading(true)
    const aiData = await getAIDraft(aiPrompt);
    setSubject(aiData.subject);
    setSubcategory(aiData.subcategory);
    setSeverity(aiData.severity);
    setMessage(aiData.message);
    setNotifyMethods(aiData.notifyMethods);
    setDraftLoading(false)
  };

  async function post(formData) {
    await postEventData(formData);
    console.log("Posted to Supabase!")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true)

    if (message.trim() && subcategory.length !== 0 && message !== "" && notifyMethods.length !== 0 && subject.trim() && severity && eventDate) {
      const formData = {
        subject,
        subcategories: subcategory,
        severity,
        message,
        notification_methods: notifyMethods,
        eventDate: eventDate.toISOString().split('T')[0] 
      };

      // Call the broadcast function
      await post(formData)
      await sendNotification(formData)
      console.log(formData)

      // Clear the form
      setSubject('');
      setSubcategory([]);
      setSeverity('');
      setMessage('');
      setNotifyMethods([]);
      setEventDate(null)
    } else {
      alert('Please fill out all the required fields.');
    }
    setSubmitLoading(false)
  };

  return (
    <div className="broadcast-form-container">
      <h2 className="broadcast-form-title">Broadcast a Message</h2>
      <form className="broadcast-form" onSubmit={handleSubmit}>

            {/* AI Drafting Option */}
            <div className="broadcast-form-ai">
            <label>Use AI to draft message:</label>
            <br />
            <br />
            <input
              type="text"
              className="broadcast-form-input"
              placeholder="Enter a brief prompt for AI"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <br />
            <br />
            <button type="button" className="broadcast-form-button" onClick={handleAIDraft}>
              {draftLoading ? "Loading Draft": "Draft with AI"}
            </button>
          </div>
          <br />
          <br />  
        {/* Subject Input */}
        <label>Subject:</label>
        <br />
        <br />
        <input
          type="text"
          className="broadcast-form-input"
          placeholder=""
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <br />
        <br />

        {/* Subcategory (Multiple Selection) */}
        <div className="broadcast-form-subcategory">
          <label>Select Subcategory:</label>
          <br />
          <br />
            <div className="broadcast-form-checkboxes">
            {subcategoryOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={subcategory.includes(option)}
                  onChange={handleSubcategoryChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <br />
        <br />
        {/* Severity (Radio Button) */}
        <div className="broadcast-form-severity">
          <label>Importance:</label>
          <br />
          <br />
            <div>
            <label>
              <input
                type="radio"
                name="severity"
                value="Regular"
                checked={severity === 'Regular'}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                name="severity"
                value="High"
                checked={severity === 'High'}
                onChange={(e) => setSeverity(e.target.value)}
              />
              High
            </label>
          </div>
        </div>

        <br />
        <br />
        <label>Message:</label>
        <br />
        <br />
        <textarea
          className="broadcast-form-textarea"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br />
        <br />

                {/* Broadcast Date Picker */}
                <div className="broadcast-form-date">
                <label>Event Date (Required):</label>
                <br /><br />
                <DatePicker
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="broadcast-form-input"
                  placeholderText="Select a date"
                  required
                />
              </div>
            <br /><br />
      
        {/* Notification Methods (Multiple Selection) */}
        <div className="broadcast-form-notify">
          <label>Notify People Via:</label>
          <br />
          <br />
            <div className="broadcast-form-checkboxes">
            <label>
              <input
                type="checkbox"
                value="SMS"
                checked={notifyMethods.includes('SMS')}
                onChange={handleNotifyMethodsChange}
              />
              SMS
            </label>
            <label>
              <input
                type="checkbox"
                value="Email"
                checked={notifyMethods.includes('Email')}
                onChange={handleNotifyMethodsChange}
              />
              Email
            </label>
          </div>
        </div>

        <br />
        <br />

        <div className="broadcast-preview">
        <h3>Message Preview</h3>
        <p><strong>Subject:</strong> {subject || 'No subject entered'}</p>
        <p><strong>Subcategory:</strong> {subcategory.length > 0 ? subcategory.join(', ') : 'No subcategory selected'}</p>
        <p><strong>Importance:</strong> {severity || 'No importance selected'}</p>
        <p><strong>Message:</strong> {message || 'No message entered'}</p>
        <p><strong>Event Date:</strong> {eventDate?.toISOString().split('T')[0]  || 'No date selected'}</p>
        <p><strong>Notify Via:</strong> {notifyMethods.length > 0 ? notifyMethods.join(', ') : 'No notification methods selected'}</p>
      </div>

      <br />
      <br />
        <button type="submit" className="broadcast-form-button">
          {submitLoading ? "Broadcasting..." : "Broadcast Message"}
        </button>
      </form>
    </div>
  );
};

export default Broadcast;
