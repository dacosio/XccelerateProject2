// const passport = require('passport');
const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

const passport = require('passport')
const UserService = require('../services/user.service');
const userService = new UserService()




/*Log In*/

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/feed',
    failureRedirect: '/auth/login',

}))

/*Sign Up*/
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup'
}))

router.get('/logout', function (req, res) {
    // console.log('logging out')
    req.logout();
    res.redirect('/auth/login');
    // console.log('should I get here?')
});

router.get('/auth/login', (req, res, next) => {
    res.render('login')
})

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }

//     res.redirect('/auth/login'); // or redirect to '/signup'
// }

// router.get('/secret', isLoggedIn, (req, res) => {
//     res.send('Here you go, a secret');
// });

// router.get('/login', function (req, res, next) {
//     res.render('login');
// })

// router.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/auth/login');
// });


// router.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/feed',
//     failureRedirect: '/auth/login'
// }));

// router.get('/error', (req, res) => {
//     res.send('You are not logged in!');
// });





/*Route paths are prepended with /auth*/

//Signup page
// router.get('/signup', function (req, res, next) {
//     res.json({
//         message: 'signup page'
//     });
// });

// function validUser(user) {
//     const validEmail = typeof user.email == 'string' &&
//         user.email.trim() != '';

//     const validPassword = typeof user.password == 'string' &&
//         user.password.trim() != '';

//     return validEmail & validPassword;
// }


// router.post('/signup', (req, res, next) => {
//     console.log(req.body)
//     if (validUser(req.body)) {
//         userService
//             .getOneByEmail(req.body.email)
//             .then(user => {
//                 //if user not found
//                 if (!user) {
//                     //this is a unique email
//                     //hash the password
//                     bcrypt.hash(req.body.password, 10)
//                         .then((hash) => {
//                             //insert user into db
//                             const register = req.body;
//                             const user = {
//                                 first_name: register.first_name,
//                                 last_name: register.last_name,
//                                 email: register.email,
//                                 password: hash
//                             };

//                             userService
//                                 .create(user)
//                                 .then(ids => {
//                                     return ids[0]
//                                 })
//                                 .then(id => {
//                                     //redirect
//                                     // res.json({
//                                     //     id,
//                                     //     message: 'successful registration'
//                                     // })
//                                     res.render('login')

//                                 })
//                         });
//                 } else {
//                     //email already in use!
//                     next(new Error('email already in use'))
//                 }
//             })
//     } else {
//         next(new Error('Invalid User'))
//     }
// })






/*router.post('/login', (req, res, next) => {
    if (validUser(req.body)) {
        //check to see if in DB
        userService
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user);
                if (user) {
                    //compare password with hashed password
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((result) => {
                            //if the passwords matched
                            // if (result) {
                            //     //setting the 'set-cookie' header
                            //     const isSecure = req.app.get('env') != 'development';
                            //     res.cookie('user_id',user.id, {
                            //         httpOnly: true,
                            //         secure: isSecure,
                            //         signed: true
                            //     })
                            //     // res.json({
                            //     //     message: 'Logged In!'
                            //     // })
                            //      res.render('feed')
                            // }
                            // else {
                            //     next(new Error('Invalid Login'))
                            // }

                            res.render('feed')

                        }); 

                } else {
                    next(new Error('Invalid Login'))
                }

            })
    } else {
        next(new Error('Invalid Login'))
    }
})

 */






module.exports = router;