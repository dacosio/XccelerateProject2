function isLoggedIn(req, res, next) {
    // console.log(req, "<from isLoggedIn")
    if (req.isAuthenticated()) {
        
        console.log('loggedIn')

        return next();
    }

    // console.log('some Error')


    res.redirect('/login');
}

module.exports = isLoggedIn;