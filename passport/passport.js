const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt')
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: 'toku',
        user: 'postgres',
        password: 'postgres'
    }
});

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        async (email, password, done) => {
            try {
                let users = await knex('users').where({
                    email: email
                });

                if (users.length == 0) {
                    return done(null, false, {
                        message: 'Username or Password incorrect'
                    })
                }
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password)
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Username or Password incorrect'
                    })
                }

            } catch (err) {
                return done(err);
            }
        }
    ));

    //NEW LOCAL SIGNUP WITH ACCESS TO REQ.BODY
      passport.use('local-signup', new LocalStrategy(

        {  passReqToCallback : true},

        async (req, username, password, done) => {
            // console.log(req, '<< passport signup')
            try {
                let users = await knex('users').where({
                    email: username
                });
                // console.log('users----->>>>>',users)
                if (users.length > 0) {
                    return done(null, false, {
                        message: "Email Already Taken"
                    });
                }
                let hash = await bcrypt.hashPassword(password)
                const newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: username,
                    password: hash
                };
                let userId = await knex('users').insert(newUser).returning('user_id');
                newUser.user_id = userId[0]; // <<<<<<<<
                done(null, newUser);
                
            } catch (err) {
                done(err)
            }
        }
    ))




    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
        let users = await knex('users').where({
            user_id: user.user_id
        });
        if (users.length == 0) {
            return done(new Error(`Wrong User id ${user.user_id}`))
        }
        user = users[0];
        return done(null, user)
    })

};