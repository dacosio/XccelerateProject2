var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
});

//FEED
router.get('/feed', function (req, res, next) {
  res.render('feed')
})


//friends -> friend's post -> post's comments

module.exports = router;