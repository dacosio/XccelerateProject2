const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt')
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: 'toku',
        user:'postgres',
        password:'postgres'
    }
});

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        async(email, password, done)=>{
            try{
                let users = await knex('users').where({email:email});
                if(users.length == 0){
                    return done(null, false, {message: 'Incorrect Credentials.'})
                } 
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password)
                if(result){
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Incorrect Credentials.'})
                }

            } catch(err){
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async(id,done)=>{
        let users = await knex('users').where({user_id:id});
        if(users.length==0){
            return done(new Error(`Wrong User id ${id}`))
        } 
        let user = users[0];
        return done(null, user)
    })

}