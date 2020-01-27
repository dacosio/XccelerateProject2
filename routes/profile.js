var express = require('express');
var moment = require('moment');
var router = express.Router();
var UserService = require('../services/user.service');
var PostService = require('../services/post.service');
var FriendService = require('../services/friend.service');

const userService = new UserService();
const postService = new PostService();
const friendService = new FriendService();

/* GET profile page. */
router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    let userProfile = null;

    userService
        .get(id)
        .then(function(user){
            if(user) {
                userProfile = user[0];
                return postService.getPostsByUser(id);
            }
            else {
                throw new Error("user not found");
            }
        })
        .then(function(posts){
            userProfile.posts = posts;
            userProfile.created_at = moment(new Date(userProfile.created_at)).fromNow();
            if(posts && posts.length > 0){
                posts.forEach(function(post){
                    post.created_at = moment(new Date(post.created_at)).fromNow();
                });
            }
            
            return friendService.getFriends(id);
        })
        .then(function(friends){
            if(friends && friends.length > 0)
                userProfile.friends = friends.map(function(friend){
                    return (friend.user_1 == id)? 
                    {
                        id: friend.user_2,
                        name: friend.firstname2 + " " + friend.lastname2
                    } : 
                    {
                        id: friend.user_1,
                        name: friend.firstname1 + " " + friend.lastname1
                    } ;
                });
            
            console.log(userProfile);
            res.render('profile', userProfile);
        })
        .catch(function(err){
            console.log(err);
            res.render('error', err);
        });
});

module.exports = router;