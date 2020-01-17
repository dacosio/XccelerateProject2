// Update with your config settings.

require ('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'socialspark',
      user:     'username',
      password: 'password'
    }
  }

};
