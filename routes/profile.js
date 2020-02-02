var express = require('express');
var moment = require('moment');
var router = express.Router();
var UserService = require('../services/user.service');
var PostService = require('../services/post.service');
var FriendService = require('../services/friend.service');

const userService = new UserService();
const postService = new PostService();
const friendService = new FriendService();

/* GET profile page. This is mounted to /profile */
router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    let userProfile = null;

    userService
        .get(id)
        .then(function(user){
            console.log(user, '<----------------user');
            
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
            userProfile.friendRequestSent = false;
            userProfile.showAddRemoveFriend = false;
            userProfile.isFriend = false;

            if(friends && friends.length > 0){
                userProfile.friends = friends
                    .filter(function(friend){
                        return friend.isAccepted == true;
                    })
                    .map(function(friend){
                        return {
                            friends_id: friend.friends_id,
                            id: (friend.user_1 == id)? friend.user_2 : friend.user_1,
                            name: (friend.user_1 == id)? friend.firstname2 + " " + friend.lastname2 : friend.firstname1 + " " + friend.lastname1
                        };
                    });
                
                userProfile.isFriend = userProfile.friends.some((friend) => friend.id == req.session.passport.user.user_id);
                if(userProfile.isFriend){
                    //get friends_id
                    userProfile.friends_id = userProfile.friends.find((friend) => friend.id == req.session.passport.user.user_id).friends_id;
                }

                userProfile.friendRequestSent = friends.some(function(fr){
                    return fr.isAccepted == false && 
                    fr.user_2 == id && fr.user_1 == req.session.passport.user.user_id
                });
            }
            userProfile.showAddRemoveFriend = userProfile.user_id != req.session.passport.user.user_id && !userProfile.friendRequestSent;

            return friendService.getFriendRequests(req.session.passport.user.user_id);
        })
        .then(function(friendRequests){
            if(friendRequests && friendRequests.length > 0) {
                userProfile.friendRequest = friendRequests
                .find(function(friend){
                    return friend.isAccepted == false && 
                    friend.user_1 == id;
                });
                
                userProfile.showConfirmDeclineRequest = friendRequests.some(function(fr){
                    return fr.isAccepted == false && 
                    fr.user_1 == id && fr.user_2 == req.session.passport.user.user_id
                });

                if(userProfile.showConfirmDeclineRequest) {
                    userProfile.showAddRemoveFriend = false;
                }
            }

            console.log("user profile", userProfile);
            res.render('profile', userProfile);
        })
        .catch(function(err){
            console.log(err);
            res.render('error', err);
        });
});

//GET Profile Update page
router.get('/update', function (req, res, next) {
    console.log(req.session.passport.user);
        userService
            .get(req.session.passport.user.user_id)
            .then(function(user){
                console.log(user);
                if(user) {
                    res.render('profileUpdate', user[0]);
                }
                else {
                    throw new Error("user not found");
                }
            })
            .catch(function(err){
                console.log("profile error: ", err);
                res.render('error', err);
            });
    });
      

/*UPDATE PROFILE */

router.post('/update', function(req, res, next){
    console.log(req.session.passport.user.user_id)
    if(req.session.passport.user.user_id) {

        console.log("request body", req.body)
        let user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            bio :  req.body.bio
          };
          userService
              .update(req.session.passport.user.user_id, user)
              .then(affected => {
                // console.log(affected)
                res.redirect('../feed');
              })
    }
    else {
        next(new Error('error' ))
    }
});
                




   
module.exports = router