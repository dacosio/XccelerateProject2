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
            console.log('logging in')
            try {
                let users = await knex('users').where({
                    email: email
                });
                console.log("users: ", users);
                if (users.length == 0) {
                    return done(null, false, {
                        message: 'Incorrect Credentials.'
                    })
                }
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password)
                if (result) {
                    console.log('wroking in logging in')
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect Credentials.'
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
                newUser.id = userId[0];
                done(null, newUser);
            } catch (err) {
                done(err)
            }
        }
    ))




    passport.serializeUser((user, done) => {
        // console.log(user, "serialIse user")
        done(null, user.user_id);
    });

    passport.deserializeUser(async (id, done) => {
        // console.log(id, '<==user_id')
        let users = await knex('users').where({
            user_id: id
        });
        if (users.length == 0) {
            return done(new Error(`Wrong User id ${id}`))
        }
        let user = users[0];
        return done(null, user)
    })

};