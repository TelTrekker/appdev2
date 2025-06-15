const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendBookNotification = async (book) => {
  const html = pug.renderFile(
    path.join(__dirname, '../views/bookCreated.pug'),
    {
      title: book.title,
      author: book.author,
      year: book.year
    }
  );

  const mailOptions = {
    from: `"Book API" <${process.env.SMTP_USER}>`,
    to: process.env.DEFAULT_EMAIL,
    subject: 'New Book Created',
    html
  };

  console.log('Sending email to:', mailOptions.to);
  await transporter.sendMail(mailOptions);
};

module.exports = sendBookNotification;
