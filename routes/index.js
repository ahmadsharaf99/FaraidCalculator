const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
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
  let feedback = new Feedback(req.body);
  console.log(feedback);
  feedback.save()
  .then((feedback) => {
    console.log(feedback);
    res.render("home/contact-success");
  })
  .catch((err) => {
    console.log(err);
  })
});

router.get("/admin2021FeedbackReports", (req, res, next) => {
  Feedback.find()
  .then((allFeedbacks) => {
    console.log(allFeedbacks);
    res.render("home/allFeedbacks", {feedbacks: allFeedbacks});
  })
  .catch((err) => {
    req.flash("error", err.message);
    console.log(err);
  });
});


router.delete('/admin2021FeedbackReports/:feedbackId', (req, res, next) => {
  Feedback.findOneAndDelete({_id: req.params.feedbackId})
  .then(() => {
      console.log("Feedback deleted.")
      res.redirect('/admin2021FeedbackReports');
  })
  .catch((err) => {
      console.log(err);
      res.redirect('/admin2021FeedbackReports');
  })
});

module.exports = router;
