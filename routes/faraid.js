var express = require('express');
var router = express.Router();

/* GET deceased male page. */
router.get('/male', (req, res, next) => {
  res.render('faraid/deceased_male');
}); 

router.get('/female', (req, res, next) => {
    res.render('faraid/deceased_female');
})

// router.post("/female", (req, res, next) => {
//   res.status(201).render("faraid/deceased_female");
// });

module.exports = router;
