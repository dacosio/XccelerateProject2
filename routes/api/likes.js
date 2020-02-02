var express = require('express');
var router = express.Router();
const LikesService = require('../../services/likes.service');

const likesService = new LikesService();

/********** These are all mounted to /api/likes *********/

//get all likes
router.get('/', function(req,res,next) {
    likesService
        .getAll()
        .then(likes => {
            res.json(likes)
        });
});


//get a specific like
router.get('/:id', function(req,res,next) {
    likesService
        .get(req.params.id)
        .then(like => res.json(like))
})

router.get('/getAllLikesForPost/:id', function(req, res, next){
    likesService
        .getAllLikesForPost(req.params.id)
        .then(likes => res.json(likes));
});


router.post('/', function(req,res,next){
    let like = {
        created_by: req.session.passport.user.user_id,
        post_id: req.body.post_id 
    };
    likesService
        .create(like)
        .then(comment_id => res.json(comment_id))
        
})

router.post('/delete', function(req, res, next){
    likesService
        .deleteLike(req.session.passport.user.user_id, req.body.post_id)
        .then(affected => res.json(affected));
});

router.put('/:id', function(req,res,next){
    let like = {
        created_by: req.body.commented_by,
        post_id: req.body.post_id 
    };
    likesService
        .update(req.params.id,like)
        .then(affected => res.json(affected))
})

router.delete('/:id', function(req,res,next){
    likesService
        .delete(req.params.id)
        .then(affected => res.json(affected))
})


module.exports = router