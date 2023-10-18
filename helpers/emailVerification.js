//! FALLANDO

const nodemailer = require('nodemailer');
require('dotenv').config();
const generateError = require('../helpers/generateError');

const { SMTP_USER, SMTP_PASSWORD } = require('../config');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});
console.log('cheguei 1');

async function sendVerifyEmail (email, subject, html) {
  console.log('cheguei 2');
  const emailOptions = {
    from: SMTP_USER,
    to: email,
    subject,
    text: html
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    throw generateError(error, 500);
  }
};

module.exports = sendVerifyEmail;
