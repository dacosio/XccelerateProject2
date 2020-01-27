var express = require('express');
var router = express.Router();

/* GET home/login page. */
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
});

router.get('/auth/login', (req,res,next) => {
  res.render('login')
})

//FEED
router.get('/feed', function (req, res, next) {
  res.render('feed')
})

//GET Sign up page
router.get('/auth/signup', function(req,res,next){
  res.render('signup')
})

//friends -> friend's post -> post's comments

module.exports = router;