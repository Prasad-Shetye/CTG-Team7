require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const client = require('twilio')("AC010b0028f21238f55b9d73887bbc8206", "2fe06ec31fa56adca91d56829e0f54ef");

// Set the SendGrid API key
sgMail.setApiKey("SG.q_bbjWz_Qs-sVzLY7z2TMA.T9HZy9jX0snEbbQWQ-sBy1PEQFizmbqP2DsP4Zabbs4");

// Function to send email
const sendEmail = async ({ to, subject, text }) => {
  const message = {
    to,
    from: 'communitryrestorationproject@gmail.com', //Created Demo Email
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
    from:"+18556177511", 
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

// Unified method to handle notifications
const sendNotification = async (formData) => {
  const { subject, subcategories, severity, message, notification_methods, eventDate } = formData;

  const notificationText = `
    Event on: ${eventDate}
    Subject: ${subject}
    Severity: ${severity}
    Subcategories: ${subcategories.join(', ')}
    Message: ${message}
  `;

  if (notification_methods.includes('Email')) {
    await sendEmail({
      to: 'communitymember417@gmail.com', // Created Demo Email
      subject,
      text: notificationText
    });
  }

  if (notification_methods.includes('SMS')) {
    await sendSMS({
      to: '+14702225337', // Google Voice Recipient
      body: notificationText
    });
  }
};

module.exports = { sendNotification };
