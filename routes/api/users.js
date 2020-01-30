var express = require('express');
var router = express.Router();
const UserService = require('../../services/user.service');

const userService = new UserService();

/********** These are all mounted to /api/users *********/

//get all user
router.get('/', function(req, res, next){
    userService
        .getAll()
        .then(users => {
            res.json(users);
        });
});

router.get('/search', function(req, res, next){
    userService
        .searchUser(req.query.qry)
        .then(function(users) {
            console.log(users);
            var response = {
              results: users.map(function(user){
                return {
                  id: user.user_id, 
                  text: user.first_name + " " + user.last_name
                };
              })
            };
            res.json(response);
        });
});

//get a specific post
router.get('/:id', function(req, res, next){
    userService
        .get(req.params.id)
        .then(user => res.json(user));
});




//create user
router.post('/', function(req, res, next){
    let user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      password: req.body.password,
      profile_name: req.body.profile_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code
    };
      userService
        .create(user)
        // .then(user_id => res.json(user_id));
        res.render('signup')
});

//update the user
router.put('/:id', function(req, res, next){
    let user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      password: req.body.password,
      profile_name: req.body.profile_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code
    };
    userService
        .update(req.params.id, user)
        .then(affected => res.json(affected));
});

//delete user (:/id)
router.delete('/:id', function(req, res, next){
    userService
        .delete(req.params.id)
        .then(affected => res.json(affected));
});

module.exports = router;