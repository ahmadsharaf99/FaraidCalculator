var express = require('express');
var router = express.Router();

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

module.exports = router;
