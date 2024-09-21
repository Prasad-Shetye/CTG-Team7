require('dotenv').config();
const sgMail = require('@sendgrid/mail')
const API_KEY = process.env.SENDGRIP_API_KEY

sgMail.setApiKey(API_KEY)

const message = {
    to: 'communitymember417@gmail.com',
    from: 'communitryrestorationproject@gmail.com',
    subject: 'hello from sendgrid',
    text: 'Hi sendgrid test'
}

sgMail
  .send(message)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })