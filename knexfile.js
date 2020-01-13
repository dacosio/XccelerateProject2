// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'name_of_database',
      user:     'postgres',
      password: 'postgres'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'name_of_database',
      user:     'username',
      password: 'password'
    }
  }

};
