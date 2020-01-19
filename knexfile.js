// Update with your config settings.

require ('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    'debug': true,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'toku',
      user:     'username',
      password: 'password'
    }
  }

};
