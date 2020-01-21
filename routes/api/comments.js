var express = require('express');
var router = express.Router();
const CommentService = require('../../services/comment.service');

const commentService = new CommentService();

/********** These are all mounted to /api/comments *********/

//get all comments
router.get('/', function(req,res,next) {
    commentService
        .getAll()
        .then(comments => {
            console.log(comments);
            res.json(comments)
        });
});


//get a specific comment
router.get('/:id', function(req,res,next) {
    commentService
        .get(req.params.id)
        .then(comment => res.json(comment))
})

//create comments
router.post('/', function(req,res,next){
    let comment = {
        description: req.body.description,
        commented_by: req.body.commented_by,
        post_id: req.body.post_id 
    };
    commentService
        .create(comment)
        .then(comment_id => res.json(comment_id))
        
})


//update the comments
router.put('/:id', function(req,res,next){
    let comment = {
        description: req.body.description,
        commented_by: req.body.commented_by,
        post_id: req.body.post_id 
    };
    commentService
        .update(req.params.id,comment)
        .then(affected => res.json(affected))
})

//delete posts
router.delete('/:id', function(req,res,next){
    commentService
        .delete(req.params.id)
        .then(affected => res.json(affected))
})


module.exports = router