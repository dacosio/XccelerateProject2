const express = require('express');
const router = express.Router();
const FriendService = require('../../services/friend.service')

const friendService = new FriendService();

/********** These are all mounted to /api/friends *********/

//get all friends
router.get('/', function(req,res,next){
    friendService
        .getAll()
        .then(friend=> res.json(friend));
})

//get a specific friend
router.get('/:id', function(req,res,next){
    friendService
        .get(req.params.id)
        .then(friend => res.json(friend));
})

//get all friends
router.get('/getAllFriends/:id', function(req,res,next) {
    friendService
        .getFriends(req.params.id)
        .then(friends => res.json(friends.rows));
})

//create friend
router.post('/', function(req,res,next) {
    let friend = {
        user_1: req.session.passport.user.user_id,
        user_2: req.body.user_id,
        isAccepted: false
    };
    friendService
        .create(friend)
        .then(friend_id => res.json(friend_id))

})


//update the posts
router.put('/:id', function(req, res, next){
    let friend = {
        user_1: req.session.passport.user.user_id,
        user_2: req.body.user_2,
        isAccepted: req.body.isAccepted == "1"
    };
    friendService
        .update(req.params.id, friend)
        .then(affected => res.json(affected));
});

//delete posts (:/id)
router.delete('/:id', function(req, res, next){
    friendService
        .remove(req.params.id)
        .then(affected => res.json(affected));
});


router.put('/accept/:id', function(req,res,next) {
    let friend = {
        isAccepted: true
    };
    friendService
        .update(req.params.id, friend)
        .then(affected => res.json(affected));
})

router.put('/decline/:id', function(req,res,next) {
    friendService
        .remove(req.params.id)
        .then(affected => res.json(affected));
})



module.exports = router