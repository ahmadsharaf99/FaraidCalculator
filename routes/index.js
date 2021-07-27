const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');

});

/* Get About Page */
router.get('/about', (req, res, next) => {
  res.render('home/about')
});

/* Get Hadeeth Page */
router.get('/hadeeth_pg', (req, res, next) => {
  res.render('home/hadeeth_pg');
});

router.get('/quran_pg', (req, res, next) => {
  res.render('home/quran_pg')
});

router.get('/report', (req, res) => {
  res.render('home/report_bug');
})

router.post('/report', (req, res, next) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "faraidproject@gmail.com",
      password: "hmfutsmiwcxgstea"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: 'ahmadsharafudeen98@gmail.com',
    to: "ahmad.sharafudeen@gmail.com",
    subject: 'New message from contact form at faraidsolution.com',
    text: `${req.body.name} (${req.body.email} says: ${req.body.message})`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error);
      res.render('home/contact-failure'); // Show a page indicating failure
    } else {
      res.render('home/contact-success'); // Show a page indicating success
    }
  })
})

module.exports = router;
