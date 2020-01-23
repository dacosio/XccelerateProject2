var express = require('express');
var moment = require('moment');
var router = express.Router();
var UserService = require('../services/user.service');
var userService = new UserService();

/* GET profile page. */
router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);

    userService
        .get(id)
        .then(function(user){
            if(user) {
                console.log(user[0]);
                user[0].created_at = moment(new Date(user[0].created_at)).fromNow();
                res.render('profile', user[0]);
            }
            else {
                res.render('error');
            }
        })
        .catch(function(err){
            res.render('error');
        });
});

module.exports = router;