var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', (req,res) => {
  res.render('login')

});

router.get('/signup',(req,res) => {
  res.render('signup',{title: 'signup'})
})

module.exports = router;
