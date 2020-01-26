const bcrypt = require('bcrypt');


module.exports.hashPassword = (plainTextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};


module.exports.checkPassword = (plainTextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, match) => {
            if(err) {
                reject(err);
            }

            resolve(match);
        });
    });
};


// basic auth

/*
synchronous setup
app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'My Application'
}));

const USERS = [
    {
        "username":"jyoti",
        "password":"abc"
    }
]

function myAuthorizer(username, password) {
    return USERS.some((user)=>{
        return user.username == username && user.password == password
    })
}


//asynchronous setup

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: 'My Application'
}));


function myAuthorizer(username, password, callback) {

    // Logic to access the database and return the users information ==> We will cover databases next week! Store the users returned into a user object, map through each object

    if(user.name == username && user.password == password ){
        return callback(null, true);
    } else {
        return callback(null, false);
    }

}


*/