var express = require('express');
var router = express.Router();
const postService = require('../services/posts-services')

//get the posts

//get a specific post

router.get('/', postService.getPostById)

//create posts

//delete posts (:/id)

//update the posts

module.exports = router