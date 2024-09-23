const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

const client = twilio(process.env.SID, process.env.authToken);

sgMail.setApiKey(process.env.sendGrid);

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
    from:"+18339592539", 
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
