var express = require('express');
var router = express.Router();
const CommentService = require('../../services/comment.service');
const PostService = require('../../services/post.service');

const commentService = new CommentService();
const postService = new PostService();

/********** These are all mounted to /api/posts *********/

//get all posts
router.get('/', function(req, res, next){
    postService
        .getAll()
        .then(posts => res.json(posts));
});



//get all posts on feed
router.get('/getFormatted', function(req, res, next){
    postService
        .getAllPostsForUser(req.session.passport.user.user_id)
        .then(posts => res.json(posts));

});

//get a specific post
router.get('/:id', function(req, res, next){
    postService
        .get(req.params.id)
        .then(post => res.json(post));
});

router.get('/:id/comments', function(req,res,next){
    commentService
        .getCommentsForPost(req.params.id)
        .then(comments => res.json(comments));
});

//create posts
router.post('/', function(req, res, next){
    let post = {
        description: req.body.description,
        created_by: req.session.passport.user.user_id,
        posted_to: req.body.posted_to
    };
    postService
        .create(post)
        .then(post_id => res.json(post_id));
});

//update the posts
router.put('/:id', function(req, res, next){
    
    let post = {
        description: req.body.description,
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