const passport = require('passport');
const express = require('express');
var router = express.Router();


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login'); // or redirect to '/signup'
}

router.get('/secret', isLoggedIn, (req, res) => {
    res.send('Here you go, a secret');
});

router.get('/login', function (req, res, next) {
    res.render('login');
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/login');
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/feed',
    failureRedirect: '/auth/login'
}));

router.get('/error', (req, res) => {
    res.send('You are not logged in!');
});

module.exports = router;