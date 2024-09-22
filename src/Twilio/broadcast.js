const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

const client = twilio("AC010b0028f21238f55b9d73887bbc8206", "2fe06ec31fa56adca91d56829e0f54ef");

sgMail.setApiKey('SG.q_bbjWz_Qs-sVzLY7z2TMA.T9HZy9jX0snEbbQWQ-sBy1PEQFizmbqP2DsP4Zabbs4');

const sendEmail = async ({subject, text }) => {
  const message = {
    to: "communitymember417@gmail.com",
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

const sendSMS = async (body) => {
  const msgOptions = {
    from:"+18556177511", 
    to: "4702225337",
    body
  };

  try {
    await client.messages.create(msgOptions);
    console.log('SMS sent');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

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
      subject,
      text: notificationText
    });
  }

  if (notification_methods.includes('SMS')) {
    await sendSMS(notificationText);
  }
};

module.exports = { sendSMS, sendNotification };
