var express = require('express');
var router = express.Router();
const knex = require('../database/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('posts').select()
    .then(data => {
      console.log(data)
    //   res.render('index', {posts: data})
    res.send('hello')
    })

});




//friends -> friend's post -> post's comments

module.exports = router;
