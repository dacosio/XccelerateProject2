var express = require('express');
var isLoggedIn = require('../passport/isLoggedin.js')
var router = express.Router();

/* GET home/login page. */
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
});

router.get('/auth/login', (req,res,next) => {
  res.render('login')
})

//FEED
router.get('/feed', isLoggedIn, function (req, res, next) {
  console.log('This is the feed router')
  console.log(req.session.passport.user);

  res.render('feed')
})

//PROFILE
// router.get('/profile/:id', isLoggedIn, function (req, res, next) {
//   const id = req.params.id
//   res.render('feed')
// })

//GET Sign up page
router.get('/auth/signup', function(req,res,next){
  res.render('signup')
})

//friends -> friend's post -> post's comments

module.exports = router;