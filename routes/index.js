var express = require('express');
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  
    res.render('login');
=======
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
>>>>>>> 3a81a34db3a498b0a45ed050d239be55c57ef18f
});

//FEED
router.get('/feed', function (req, res, next) {
  res.render('feed')
})


//friends -> friend's post -> post's comments

module.exports = router;