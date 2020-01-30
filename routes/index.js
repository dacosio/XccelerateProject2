var express = require('express');
var moment = require('moment');
var isLoggedIn = require('../passport/isLoggedin.js')
var router = express.Router();

var UserService = require('../services/user.service');
var PostService = require('../services/post.service');
var FriendService = require('../services/friend.service');

const userService = new UserService();
const postService = new PostService();
const friendService = new FriendService();

/* GET home/login page. */
router.get('/', function (req, res, next) {
  res.redirect('/auth/login')
});
router.get('/login', function (req, res, next) {
  res.redirect('/auth/login')
});

router.get('/auth/login', (req, res, next) => {
  res.render('login')
})

//FEED
router.get('/feed', isLoggedIn, function (req, res, next) {
  // console.log('This is the feed router')
  console.log(req.session.passport.user, '<----passport session');

  var id = parseInt(req.session.passport.user.user_id);
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

          console.log("feed",userProfile);
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
  res.render('signup')
})



//GET Profile Update page
router.get('/profile/profileUpdate', isLoggedIn, function (req, res, next) {
  res.render('profileUpdate')
})

//friends -> friend's post -> post's comments

module.exports = router;