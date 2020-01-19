var express = require('express');
var router = express.Router();
const PostService = require('../services/post.service');

const postService = new PostService();

//get all posts
router.get('/', function(req, res, next){
    postService
        .getAll()
        .then(posts => {
            console.log(posts);
            
            res.json(posts);
        });
});

//get a specific post
router.get('/:id', function(req, res, next){
    postService
        .get(req.params.id)
        .then(post => res.json(post));
});

//create posts
router.post('/', function(req, res, next){
    let post = {
        body: req.body.body,
        created_by: req.body.created_by,
        posted_to: req.body.posted_to
    };
    postService
        .create(post)
        .then(post_id => res.json(post_id));
});

//update the posts
router.put('/:id', function(req, res, next){
    
    let post = {
        body: req.body.body,
        created_by: req.body.created_by,
        posted_to: req.body.posted_to
    };

    postService
        .update(req.params.id, post)
        .then(affected => res.json(affected));
});

//delete posts (:/id)
router.delete('/:id', function(req, res, next){
    postService
        .delete(req.params.id)
        .then(affected => res.json(affected));
});

module.exports = router;