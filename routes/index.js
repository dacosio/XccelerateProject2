var express = require('express');
var moment = require('moment');
var isLoggedIn = require('../passport/isLoggedin.js')
var router = express.Router();

var UserService = require('../services/user.service');
var PostService = require('../services/post.service');
var FriendService = require('../services/friend.service');
var LikesService = require('../services/likes.service');

const userService = new UserService();
const postService = new PostService();
const friendService = new FriendService();
const likesService = new LikesService();

/* GET home/login page. */
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
});
router.get('/login', function (req, res, next) {
  res.redirect('/auth/login')
});

router.get('/auth/login', (req, res, next) => {
  res.render('login',  {message: req.flash('error')})
})

//FEED
router.get('/feed', isLoggedIn, function (req, res, next) {

  var id = parseInt(req.session.passport.user.user_id);
  let userProfile = null;

  userService
      .get(id)
      .then(function(user){
          if(user) {
              userProfile = user[0];
              return postService.getAllPostsForUser(id);
          }
          else {
              throw new Error("user not found");
          }
      })
      .then(function(posts){
          console.log("POSTS",posts);
          userProfile.created_at = moment(new Date(userProfile.created_at)).fromNow();

          if(posts && posts.length > 0){
            posts.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.created_at) - new Date(a.created_at);
            });
              for (let index = 0; index < posts.length; index++) {
                  posts[index].created_at = moment(new Date(posts[index].created_at)).fromNow();
                  likesService
                    .getAllLikesForPost(posts[index].post_id)
                    .then(function(lk){
                        posts[index].likes = lk.length;

                        posts[index].isLiked = lk.some(like => like.post_id == posts[index].post_id && like.created_by == id);
                    });
              }
          }
          userProfile.posts = posts;
          return friendService.getFriends(id);
      })
      .then(function(friends){
          if(friends && friends.length > 0){
              userProfile.friends = friends
              .filter(function(friend){
                return friend.isAccepted;
              })
              .map(function(friend){
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
                return !friend.isAccepted;
              })
              .map(function(friend){
                  return (friend.user_1 == id)? 
                  {
                      friendId: friend.friends_id,
                      id: friend.user_2,
                      name: friend.firstname2 + " " + friend.lastname2
                  } : 
                  {
                      friendId: friend.friends_id,
                      id: friend.user_1,
                      name: friend.firstname1 + " " + friend.lastname1
                  } ;
              });

              userProfile.friendRequestSent = userProfile.friendRequests.some(function(fr){
                  return fr.id == id;
              });

              if(userProfile.friendRequestSent) {
                  userProfile.showAddRemoveFriend = false;
              }
          }

          console.log("feed", userProfile);
          res.render('feed', userProfile);
      })
      .catch(function(err){
          console.log(err);
          res.render('error', err);
      });
  
})

//GET Sign up page
router.get('/signup', function(req,res,next) {
  res.redirect('/auth/signup')
})

router.get('/auth/signup', function (req, res, next) {
  res.render('signup', {message: req.flash('error')})
})



//GET Profile Update page
router.get('/profile/profileUpdate', isLoggedIn, function (req, res, next) {
    var id = parseInt(req.session.passport.user.user_id);
    let userProfile = null;
  
    userService
        .get(id)
        .then(function(user){
            if(user) {
                res.render('profileUpdate', user[0])
            }
            else {
                throw new Error("user not found");
            }
        })
        .catch(function(err){
            console.log(err);
            res.render('error', err);
        });

})

//friends -> friend's post -> post's comments

module.exports = router;