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
            if(friends && friends.length > 0){
                userProfile.friends = friends
                    .filter(function(friend){
                        return friend.isAccepted == true;
                    })
                    .map(function(friend){
                        return {
                            id: (friend.user_1 == id)? friend.user_2 : friend.user_1,
                            name: (friend.user_1 == id)? friend.firstname2 + " " + friend.lastname2 : friend.firstname1 + " " + friend.lastname1
                        };
                    });
            }

            userProfile.showAddRemoveFriend = userProfile.user_id != req.session.passport.user.user_id;

            userProfile.isFriend = (userProfile.friends && userProfile.friends.length > 0)?
                userProfile.friends.find((friend) => friend.id == req.session.passport.user.user_id): false;

            return friendService.getFriendRequests(req.session.passport.user.user_id);
        })
        .then(function(friendRequests){
            userProfile.friendRequestSent = false;
            if(friendRequests && friendRequests.length > 0) {
                userProfile.friendRequests = friendRequests
                .filter(function(friend){
                    return friend.isAccepted == false;
                })
                .map(function(friend){
                    return {
                        friendId: friend.friends_id,
                        id: (friend.user_1 == id)? friend.user_2 : friend.user_1,
                        name: (friend.user_1 == id)? friend.firstname2 + " " + friend.lastname2 : friend.firstname1 + " " + friend.lastname1
                    };
                });

                userProfile.friendRequestSent = userProfile.friendRequests.some(function(fr){
                    console.log(`${fr.id} == ${id}`);
                    return fr.id == id;
                });

                if(userProfile.friendRequestSent) {
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



/*UPDATE PROFILE */

// router.put('/profileUpdate/:id', function(req, res, next){
//     if(req.params.id == req.session.passport.user.user_id) {
//         let user = {
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             address: req.body.address,
//             city: req.body.city,
//             state: req.body.state,
//             bio :  req.body.bio
//           };
//           userService
//               .update(req.session.passport.user.user_id, user)
//               .then(affected => {
//                 console.log(affected)
//                 res.render('feed');
//               })
//     }
//     else {
//         next(new Error('error' ))
//     }
// })
                
    
   
module.exports = router