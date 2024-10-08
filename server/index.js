require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(cors());

// Set up SendGrid
sgMail.setApiKey('');

// Set up Twilio
const accountSid = '';
const authToken = '';
const client = twilio(accountSid, authToken);

// Function to send email
const sendEmail = async ({ to, subject, text }) => {
    const message = {
        to,
        from: 'communitryrestorationproject@gmail.com',
        subject,
        text
    };

    try {
        await sgMail.send(message);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to send SMS
const sendSMS = async ({ to, body }) => {
    const msgOptions = {
        from: "+18339592539",
        to,
        body
    };

    try {
        await client.messages.create(msgOptions);
        console.log('SMS sent');
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

// Unified endpoint to handle notifications
app.post('/notify', async (req, res) => {
    const formData = req.body;
    const { subject, subcategories, severity, message, notification_methods, eventDate } = formData;

    const notificationText = `
        Event on: ${eventDate}
        Subject: ${subject}
        Severity: ${severity}
        Subcategories: ${subcategories.join(', ')}
        Message: ${message}
    `;

    try {
        if (notification_methods.includes('Email')) {
            await sendEmail({
                to: 'communitymember417@gmail.com',
                subject,
                text: notificationText
            });
        }

        if (notification_methods.includes('SMS')) {
            await sendSMS({
                to: '+14702225337',
                body: notificationText
            });
        }

        res.status(200).json({ message: 'Notifications sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending notifications' });
    }
});

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
